import pymongo
from reportingtool.services.configservice.configservice import ConfigService


class MongoHelper():
    def __init__(self):
        pass

    def add_data_to_mongo_collection(self, config, database_name, collection_name):
        client = self.create_client(database_name)
        mydb = client[database_name]
        collection = mydb[collection_name]
        try:
            x = collection.insert_one(config)
            return x
        except Exception as e:
            raise e

    def get_data_from_mongo(self, query, database_name, collection_name):
        client = self.create_client(database_name)
        mydb = client[database_name]
        collection = mydb[collection_name]
        try:
            x = collection.find(query)
            return x
        except Exception as e:
            raise e

    @staticmethod
    def create_client(database_name):
        conf = ConfigService()
        config = conf.getconfig(database_name)
        host = config['Host']
        port = config['Port']
        connection_string = f"mongodb://{host}:{port}/"
        myclient = pymongo.MongoClient(connection_string)
        return myclient
