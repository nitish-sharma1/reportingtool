from configparser import ConfigParser
import os

config = ConfigParser()
env_file_path = os.path.join(os.getcwd(), '.env-config.ini')
config.read(env_file_path)


class ConfigService:

    @staticmethod
    def getconfig(param):
        """return the section of the config which is requested"""
        section = config[param]
        return section
