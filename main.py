from services.datasource_connector import Connector
from sqlalchemy import text
from services.encryptionservice.encryptionservice import Encryption_Service
from dotenv import load_dotenv

load_dotenv() #laod the env variables

connector = Connector(database_type="postgres")
conn = connector.create_engine('reprotingdb')
with conn.connect() as connection:
    result = connection.execute(text("select * from posts"))
    tables = result.fetchall()
    print(tables)