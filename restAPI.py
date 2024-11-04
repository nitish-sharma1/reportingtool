from flask import Flask, request, jsonify
from flask_cors import CORS
from services.reportconfigservice.reportconfigservice import Report_config_service
from Schema.configschema import ConfigSchema
from Schema.datasourceschema import DataSourceSchema
from marshmallow import ValidationError
from services.MongoHelperService.mongohelperservice import MongoHelper

app = Flask(__name__)
CORS(app)


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
    collection = mydb['outbound_service_config']
    try:
        service_name = collection.distinct("service_name")
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
        return {"msg": "sent succesful"}, 200

    except Exception as e:
        return {"msg": "somthing went wrong", "exception": e}, 500


if __name__ == '__main__':
    app.run()
