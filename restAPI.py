from flask import Flask, request
from flask_cors import CORS
from services.reportconfigservice.reportconfigservice import Report_config_service

app = Flask(__name__)
CORS(app)


@app.route('/api/v1/add-config', methods=["POST"])
def add_config_to_mongo():
    body = request.get_json()
    config_service = Report_config_service()
    try:
        result = config_service.add_config(body)
        return {"msg": "added config successfully"}, 200

    except Exception as e:
        return {"msg": "somthing went wrong", "exception": e}, 500


if __name__ == '__main__':
    app.run()