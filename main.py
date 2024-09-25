from services.datasource_connector import Connector
from sqlalchemy import text
from dotenv import load_dotenv

load_dotenv() #laod the env variables
connector = Connector('localhost',3306)
conn = connector.create_connection()
with conn.connect() as connection:
    result = connection.execute(text("SELECT * FROM orders"))
    tables = result.fetchall()
    print(tables)