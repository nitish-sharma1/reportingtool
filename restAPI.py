from flask import Flask, request, jsonify
from flask_cors import CORS
from services.reportconfigservice.reportconfigservice import Report_config_service
from Schema.configschema import ConfigSchema
from Schema.datasourceschema import DataSourceSchema
from marshmallow import ValidationError
from services.MongoHelperService.mongohelperservice import MongoHelper

app = Flask(__name__)
CORS(app)


@app.route('/api/v1/check-connection', methods=["GET"])
def check_connection():
    return {"msg": "connection successful"}


@app.route('/api/v1/add-config', methods=["POST"])
def add_config_to_mongo():
    schema = ConfigSchema()
    body = request.json
    try:
        report_data = schema.load(body)

    except ValidationError as err:
        return jsonify(err.messages), 400  # Return validation errors
    config_service = Report_config_service()
    try:
        result = config_service.add_config(report_data)
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
