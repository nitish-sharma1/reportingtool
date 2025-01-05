from kafka import KafkaProducer
import json
from dotenv import load_dotenv
from services.loggingservice.loggingservice import Logger
from services.datetime_service.datetime_service import Datetime_Service
from reportingtool.services.reportconfigservice.reportconfigservice import Report_config_service
import os
from bson import ObjectId  # Ensure this import is available if you're using MongoDB.


def convert_objectid_to_str(data):
    if isinstance(data, dict):
        return {k: str(v) if isinstance(v, ObjectId) else v for k, v in data.items()}
    return data


load_dotenv()  # Load the env variables

logger = Logger()  # Starting the logger for the main
logger.info('Started executing the main ...')
dt = Datetime_Service()
current_time = dt.get_current_time_str()
current_day = dt.get_current_day()
query = {
    "$and": [
        {"report_time": current_time},
        {"frequency": current_day}
    ]
}
Report_conf = Report_config_service()
result = Report_conf.get_config(query=query)

producer = KafkaProducer(
    bootstrap_servers=os.getenv('KAFKA_SERVER'),
    api_version=(0, 11, 5),
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)
for report_details in result:
    report_details = convert_objectid_to_str(report_details)
    producer.send('report_topic', report_details)
    logger.info(f'Produced message for report: {report_details["report_name"]}')

producer.flush()
logger.info('All messages produced to Kafka.')

