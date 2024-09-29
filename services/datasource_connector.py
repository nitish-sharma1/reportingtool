import os
from sqlalchemy import create_engine
from reportingtool.services.configservice.configservice import ConfigService


class Connector:
    def __init__(self, database_type):
        self.database_type = database_type

    def create_engine(self,instance_name):
        if self.database_type == 'mssql':
            return self.connect_mssql(instance_name)

    def connect_mssql(self,instance):
        conf = ConfigService()
        print(conf)
        config = conf.getconfig(instance)

        user = config["User"]
        password = config["Password"]
        host = config["Host"]
        port = config["Port"]
        dbname = config["Dbname"]
        driver = config["Driver"]
        connection_string = f'mssql+pyodbc://{user}:{password}@{host}:{port}/{dbname}"?driver={driver}'
        engine = create_engine(connection_string, echo=True)
        return engine

    def connect_mysql(self):
        pass

    def connect_postgres(self):
        pass
