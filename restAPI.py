import bcrypt
from flask import Flask, request, jsonify, make_response,Response
from flask_cors import CORS
import os
from flask_jwt_extended import JWTManager, create_access_token, verify_jwt_in_request, decode_token
from dotenv import load_dotenv
from services.reportconfigservice.reportconfigservice import Report_config_service
from Schema.configschema import ConfigSchema
from Schema.datasourceschema import DataSourceSchema
from Schema.loginschema import LoginSchema
from Schema.outboundServicesSchema import OutboundServiceAWS, OutboundServiceMFT, OutboundServiceSMTP
from marshmallow import ValidationError
from services.MongoHelperService.mongohelperservice import MongoHelper
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
from Schema.userschema import UserSchema
import datetime
from werkzeug.security import check_password_hash, generate_password_hash

load_dotenv()  #laod the env variables

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')  # Load JWT secret key from .env
app.config['ENV'] = os.getenv('FLASK_ENV', 'production')  # Optional: Load Flask environment (default to 'production')
jwt = JWTManager(app)
CORS(app, supports_credentials=True)


@app.before_request
def basic_authentication():
    if request.method.lower() == 'options':
        return Response()

    exempt_routes = ['/api/v1/login', '/api/v1/signup', '/api/v1/getinstancename', '/api/v1/getoutboundservice']
    if request.path in exempt_routes:
        return  # Skip validation for these routes

    # Extract token from Authorization header
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"message": "Unauthorized", "error": "Missing Authorization Header"}), 401

    try:
        # Expect "Bearer <token>"
        token = auth_header.split(" ")[1]
        verify_jwt_in_request()
    except Exception as e:
        return jsonify({"message": "Unauthorized", "error": str(e)}), 401




# Other routes (get_instance_name, get_outbound_service_name, etc.) remain unchanged.

@app.route('/api/v1/getinstancename', methods=["GET"])
def get_instance_name():
    client = MongoHelper().create_client('reportconfigdb')
    mydb = client['reportconfigdb']
    collection = mydb['datasource']
    try:
        instance_names = collection.distinct("instance_name")
        return jsonify({"instance_names": instance_names})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        client.close()


@app.route('/api/v1/getoutboundservice', methods=["GET"])
def get_outbound_service_name():
    client = MongoHelper().create_client('reportconfigdb')
    mydb = client['reportconfigdb']
    collection = mydb['outbound_services']
    try:
        service_name = collection.distinct("outbound_service_name")
        return jsonify({"service_name": service_name})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        client.close()


@app.route('/api/v1/add-report', methods=["POST"])
def add_config_to_mongo():
    schema = ConfigSchema()
    body = request.json
    try:
        report_data = schema.load(body)

    except ValidationError as err:
        return jsonify(err.messages), 400  # Return validation errors

    try:
        result = MongoHelper().add_data_to_mongo_collection(report_data, 'reportconfigdb', 'reportconfigs')
        return {"msg": "added config successfully"}, 200

    except Exception as e:
        return {"msg": "somthing went wrong", "exception": e}, 500


@app.route('/api/v1/add-data-source', methods=["POST"])
def add_data_source():
    schema = DataSourceSchema()
    body = request.json
    try:
        data_source_parsed_json = schema.load(body)

    except ValidationError as err:
        return jsonify(err.messages), 400  # Return validation errors
    try:
        result = MongoHelper().add_data_to_mongo_collection(data_source_parsed_json, 'reportconfigdb', 'datasource')
        return {"msg": "sent successful"}, 200

    except Exception as e:
        return {"msg": "somthing went wrong", "exception": e}, 500


@app.route('/api/v1/add-outbound-service', methods=["POST"])
def add_outbound_service():
    global schema
    body = request.json

    try:
        outbound_service_type = body["outbound_service_type"]
        if outbound_service_type == "smtp":
            schema = OutboundServiceSMTP()
        elif outbound_service_type == "awss3":
            schema = OutboundServiceAWS()
        elif outbound_service_type == "sftp":
            schema = OutboundServiceMFT()
        data_source_parsed_json = schema.load(body)

    except ValidationError as err:
        return jsonify(err.messages), 400  # Return validation errors
    try:
        result = MongoHelper().add_data_to_mongo_collection(data_source_parsed_json, 'reportconfigdb',
                                                            'outbound_services')
        return {"msg": "sent successful"}, 200

    except Exception as e:
        return {"msg": "somthing went wrong", "exception": e}, 500


@app.route('/api/v1/get-report-data', methods=["GET"])
def get_report_data():
    try:
        # Create MongoDB client and connect to the database
        with MongoHelper().create_client('reportconfigdb') as client:
            mydb = client['reportconfigdb']
            collection = mydb['reportconfigs']

            # Fetch and serialize the reports
            reports = list(collection.find())  # Convert cursor to a list
            serialized_reports = dumps(reports)  # Serialize BSON to JSON

            # Return the serialized data directly
            return app.response_class(serialized_reports, content_type='application/json')
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/v1/change-report-status/<string:idd>', methods=["PUT"])
def change_report_status(idd):
    try:
        with MongoHelper().create_client('reportconfigdb') as client:
            mydb = client['reportconfigdb']
            collection = mydb['reportconfigs']

            # Validate ObjectId
            if not ObjectId.is_valid(idd):
                return jsonify({"error": "Invalid ID format"}), 400

            result = collection.find_one_and_update(
                {"_id": ObjectId(idd)},
                [{"$set": {"isEnabled": {"$not": "$isEnabled"}}}],  # set isEnabled = !isEnabled
                return_document=True
            )

            if result is None:
                return jsonify({"error": "Document not found"}), 404

            return jsonify({
                "message": "Status updated successfully",
                "document": {
                    "_id": str(result["_id"]),
                    "isEnabled": result["isEnabled"]
                }
            }), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/v1/signup', methods=['POST'])
def sign_up():
    user_schema = UserSchema()

    try:
        # Parse and validate input data
        data = request.get_json()
        if not data:
            return jsonify({"error": "Request payload is empty"}), 400

        # Validate and deserialize input data
        user_data = user_schema.load(data)

        # Check if a user with the given email already exists
        cursor = MongoHelper().get_data_from_mongo(
            {"email": user_data["email"]},
            'reportconfigdb',
            'users'
        )
        existing_users = list(cursor)
        if existing_users:
            return jsonify({"error": "User with this email already exists"}), 400

        # Hash the password using bcrypt
        hashed_password = bcrypt.hashpw(
            user_data["password"].encode('utf-8'), bcrypt.gensalt()
        )
        user_data["password"] = hashed_password.decode('utf-8')  # Store as string

        # Add the user to the database
        result = MongoHelper().add_data_to_mongo_collection(
            user_data,
            'reportconfigdb',
            'users'
        )

        # Get the inserted user's _id
        user_id = str(result.inserted_id)

        # Generate a JWT token including the user's email and _id
        access_token = create_access_token(
            identity=user_data["email"],
            expires_delta=datetime.timedelta(hours=1),
            additional_claims={"user_id": user_id}  # Include user_id in additional claims
        )

        # Create a response and set the JWT token as an HTTP-only cookie
        response = make_response(jsonify({"msg": "User created successfully"}), 201)
        response.set_cookie(
            "jwt",  # Cookie name
            access_token,  # Cookie value
            httponly=True,  # Prevent access via JavaScript
            secure=True,  # Only send over HTTPS in production
            samesite='Strict',  # CSRF protection
            max_age=3600  # Cookie expiration in seconds (1 hour)
        )
        return response

    except ValidationError as e:
        return jsonify({"errors": e.messages}), 400

    except Exception as e:
        return jsonify({"msg": "Something went wrong", "exception": str(e)}), 500


@app.route('/api/v1/login', methods=['POST'])
def login():
    login_schema = LoginSchema()

    try:
        # Parse and validate input data
        data = request.get_json()
        data = login_schema.load(data)
        username = data.get('username')
        password = data.get('password')

        # Fetch user data from MongoDB
        cursor = MongoHelper().get_data_from_mongo(
            {"username": username},
            'reportconfigdb',
            'users'
        )
        existing_users = list(cursor)

        # Check if the user exists
        if not existing_users:
            return jsonify({"msg": "Invalid credentials"}), 401

        user = existing_users[0]

        # Verify the password
        stored_hashed_password = user["password"].encode('utf-8')
        if not bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password):
            return jsonify({"msg": "Invalid password"}), 401

        # Get the user's _id and convert it to string
        user_id = str(user["_id"])

        # Generate the JWT token with email (or username) and user_id as additional claims
        access_token = create_access_token(
            identity=username,  # Store username as the identity
            expires_delta=datetime.timedelta(hours=1),  # Expiry time for token
            additional_claims={"user_id": user_id}  # Include user_id in additional claims
        )

        # Create a response and set the JWT token as an HTTP-only cookie
        response = make_response(jsonify({"msg": "Login successful"}), 200)
        response.set_cookie(
            "jwt",  # Cookie name
            access_token,  # Cookie value
            httponly=True,  # Prevent access via JavaScript
            secure=True,  # Only send over HTTPS in production
            samesite='Strict',  # CSRF protection
            max_age=3600  # Cookie expiration in seconds (1 hour)
        )
        return response

    except ValidationError as e:
        return jsonify({"errors": e.messages}), 400

    except Exception as e:
        return jsonify({"msg": "Something went wrong", "exception": str(e)}), 500


if __name__ == '__main__':
    app.run()
