import pydoc
import os
from sqlalchemy import create_engine

class Connector:
    def __init__(self,host,port):
        self.host = host
        self.port = port
        self.user = os.environ.get('USERNAME')
        self.password = os.environ.get('PASS')
    def create_connection(self):
        connection_string=f'mysql+pymysql://{self.user}:{self.password}@{self.host}:{self.port}/dev01'
        engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)
        return engine

