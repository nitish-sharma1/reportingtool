import os
from sqlalchemy import create_engine


class Connector:
    def __init__(self, database_type,instance_name):
        self.database_type = database_type
        self.instance_name = instance_name
    def create_engine(self):
        if self.database_type == 'MSSQL' :
            return self.connect_mssql()


    def connect_mssql(self):
        connection_string = f'mssql+pyodbc://{self.user}:{self.password}@{self.host}:{self.port}/master?driver=ODBC+Driver+17+for+SQL+Server'
        engine = create_engine(connection_string, echo=True)
        return engine

    def connect_mysql(self):
        pass

    def connect_postgres(self):
