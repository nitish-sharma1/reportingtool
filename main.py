from services.datasource_connector import Connector
from sqlalchemy import text
from dotenv import load_dotenv

load_dotenv() #laod the env variables
connector = Connector(database_type="mssql")
conn = connector.create_engine('awsproddb')
with conn.connect() as connection:
    result = connection.execute(text("SELECT name FROM master.dbo.sysdatabases"))
    tables = result.fetchall()
    print(tables)