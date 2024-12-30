from kafka import KafkaConsumer
import json
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text
from reportingtool.services.datasource_connector.datasource_connector import Connector
from reportingtool.services.excel_report_service.excel_report_service import ExcelReportService
from services.aws_s3_service.aws_s3_service import S3Upload
from services.loggingservice.loggingservice import Logger
import os
from dotenv import load_dotenv

load_dotenv()  # Load the env variables
logger = Logger()  # Starting the logger for the consumer
logger.info('Started executing the consumer ...')

consumer = KafkaConsumer(
    'report_topic',
    bootstrap_servers=os.getenv('KAFKA_SERVER'),
    api_version=(0, 11, 5),
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for message in consumer:
    logger.info(f'Consumed message: {message.value}')
    # report_details = message.value
    # query = report_details['query']
    # database_type = report_details['database_type']
    # instance_name = report_details['instance_name']
    # report_name = report_details['report_name']
    #
    # logger.info(f'Processing report: {report_name}')
    #
    # try:
    #     connector = Connector(database_type=database_type)
    #     conn = connector.create_engine(instance_name=instance_name)
    #
    #     with conn.connect() as connection:
    #         result = connection.execute(text(query))
    #         data = result.fetchall()
    #         headers = list(result.keys())
    #
    #         if not data:
    #             logger.warning(f'No data returned for report: {report_name}')
    #             continue  # Skip to the next report
    #         excel_helper = ExcelReportService()
    #         generated_file_path = excel_helper.generate_excel(headers, data, report_name)
    #         s3 = S3Upload()
    #         s3.upload_doc_to_s3(generated_file_path, 'dnireports', f'{report_name}.xlsx')
    #         logger.info(f'Report {report_name} successfully generated and uploaded.')
    #
    # except SQLAlchemyError as db_error:
    #     logger.error(f"Database error for report '{report_name}': {db_error}")
    # except Exception as e:
    #     logger.error(f"Unexpected error for report '{report_name}': {e}")