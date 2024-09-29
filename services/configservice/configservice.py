from configparser import ConfigParser
import os
config = ConfigParser()
env_file_path = os.path.join(os.getcwd(),'.env-config.ini')
config.read(env_file_path)

class ConfigService:
    def __init__(self):
        """initialise the obj of config parser and read the env config file"""

        print(env_file_path)
        try:
            print(config.sections())
        except:
            print("not read the file")


    def get_sections(self):


        print(config.sections())

    def getconfig(self, param):
        """return the section of the config which is requested"""
        section = config[param]
        return section
