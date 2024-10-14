from flask import Flask, request, jsonify
from flask_cors import CORS
from services.reportconfigservice.reportconfigservice import Report_config_service
from marshmallow import Schema, fields, ValidationError

app = Flask(__name__)
CORS(app)


class ConfigSchema(Schema):
    database_type = fields.Str(required=True)
    instance_name = fields.Str(required=True)
    report_time = fields.Str(required=True)
    frequency = fields.List(fields.Str(), required=True)
    report_name = fields.Str(required=True)
    query = fields.Str(required=True)
    recipents = fields.List(fields.Str(), required=False)
    subject = fields.Str(required=False)
    email_body = fields.Str(required=False)
    transfer_type = fields.Str(required=True)

    class Meta:
        strict = True


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


if __name__ == '__main__':
    app.run()
