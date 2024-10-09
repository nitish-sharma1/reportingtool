from reportingtool.services.datasource_connector.datasource_connector import Connector
from sqlalchemy import text
from dotenv import load_dotenv

from reportingtool.services.excel_report_service.excel_report_service import ExcelReportService
from reportingtool.services.reportconfigservice.reportconfigservice import Report_config_service
from reportingtool.services.smtpservice.smtpservice import SMTPService
from services.encryptionservice.encryptionservice import Encryption_Service
from services.datetime_service.datetime_service import Datetime_Service

from services.loggingservice.loggingservice import Logger

load_dotenv()  #laod the env variables

logger = Logger()  #staring the logger for the main
logger.info('stated executing the main ...')
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
for report_details in result:
    query = report_details['query']
    database_type = report_details['database_type']
    instance_name = report_details['instance_name']
    report_name = report_details['report_name']
    try:
        connector = Connector(database_type=database_type)
        conn = connector.create_engine(instance_name=instance_name)
        with conn.connect() as connection:
            result = connection.execute(text(query))
            data = result.fetchall()
            headers = list(result.keys())
            excel_helper = ExcelReportService()
            generated_file_path = excel_helper.generate_excel(headers, data, report_name)
            email_service = SMTPService()
            email_service.send_mail(to='nitishsharma.sharma2@gmail.com',subject='stock_recon',body='PFA report',attachment_path=generated_file_path)
    except Exception as e:
        print(e)

logger.info('ending the service')
