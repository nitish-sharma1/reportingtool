from reportingtool.services.datasource_connector.datasource_connector import Connector
from sqlalchemy import text
from dotenv import load_dotenv
from reportingtool.services.reportconfigservice.reportconfigservice import Report_config_service
from reportingtool.services.smtpservice.smtpservice import SMTPService
from services.encryptionservice.encryptionservice import Encryption_Service
from services.datetime_service.datetime_service import Datetime_Service

from services.loggingservice.loggingservice import Logger

load_dotenv()  #laod the env variables

smtp = SMTPService()
smtp.send_mail('randommail@gmail.com', 'hello', 'this is a test mail')
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
for q in result:
    print(q)

logger.info('ending the service')
# connector = Connector(database_type="postgres")

# conn = connector.create_engine('reprotingdb')
# with conn.connect() as connection:
#     result = connection.execute(text("select * from posts"))
#     tables = result.fetchall()
#     print(tables)
