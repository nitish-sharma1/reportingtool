from services.datasource_connector import Connector

connector = Connector('localhost',3306)
conn = connector.create_connection()
print(conn)