import os
from sqlalchemy import create_engine
from reportingtool.services.configservice.configservice import ConfigService
from reportingtool.services.encryptionservice.encryptionservice import Encryption_Service


class Connector:
    def __init__(self, database_type):
        self.database_type = database_type

    def create_engine(self, instance_name):
        if self.database_type == 'mssql':
            return self.connect_mssql(instance_name)
        elif self.database_type == 'mysql':
            return self.connect_mysql(instance_name)
        elif self.database_type == 'postgres':
            return self.connect_postgres(instance_name)

    @staticmethod
    def connect_mssql(instance):
        conf = ConfigService()
        print(conf)
        config = conf.getconfig(instance)
        decrypt = Encryption_Service()
        user = config["User"]
        password = decrypt.decrypt(config["Password"])
        host = config["Host"]
        port = config["Port"]
        dbname = config["Dbname"]
        driver = config["Driver"]
        connection_string = f'mssql+pyodbc://{user}:{password}@{host}:{port}/{dbname}"?driver={driver}'
        engine = create_engine(connection_string, echo=True)
        return engine

    @staticmethod
    def connect_mysql(instance):
        conf = ConfigService()
        config = conf.getconfig(instance)
        decrypt = Encryption_Service()
        user = config["User"]
        password = decrypt.decrypt(config["Password"])
        host = config["Host"]
        port = config["Port"]
        dbname = config["Dbname"]
        connection_string = f'mysql+pymysql://{user}:{password}@{host}:{port}/{dbname}?charset=utf8mb4'
        engine = create_engine(connection_string)
        return engine

    @staticmethod
    def connect_postgres(instance):
        conf = ConfigService()
        config = conf.getconfig(instance)
        decrypt = Encryption_Service()
        user = config["User"]
        password = decrypt.decrypt(config["Password"])
        host = config["Host"]
        port = config["Port"]
        dbname = config["Dbname"]
        engine = create_engine(f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{dbname}")
        return engine
