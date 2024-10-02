from reportingtool.services.datasource_connector.datasource_connector import Connector
from sqlalchemy import text
from dotenv import load_dotenv
from services.encryptionservice.encryptionservice import Encryption_Service

load_dotenv() #laod the env variables


connector = Connector(database_type="postgres")
conn = connector.create_engine('reprotingdb')
with conn.connect() as connection:
    result = connection.execute(text("select * from posts"))
    tables = result.fetchall()
    print(tables)

