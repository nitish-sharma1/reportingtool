from reportingtool.services.datasource_connector.datasource_connector import Connector
from sqlalchemy import text
from dotenv import load_dotenv
from reportingtool.services.reportconfigservice.reportconfigservice import Report_config_service
from services.encryptionservice.encryptionservice import Encryption_Service
from services.datetime_service.datetime_service import Datetime_Service

load_dotenv()  #laod the env variables

dt = Datetime_Service()
print(dt.get_current_day())
print(dt.get_current_time_str())

# connector = Connector(database_type="postgres")
# conn = connector.create_engine('reprotingdb')
# with conn.connect() as connection:
#     result = connection.execute(text("select * from posts"))
#     tables = result.fetchall()
#     print(tables)
