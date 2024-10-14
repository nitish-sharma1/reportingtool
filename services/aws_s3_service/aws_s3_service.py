import boto3
from reportingtool.services.configservice.configservice import ConfigService
from reportingtool.services.encryptionservice.encryptionservice import Encryption_Service


class S3Upload:
    def __init__(self):
        conf = ConfigService()
        config = conf.getconfig('awss3config')
        dcrypt = Encryption_Service()
        self.access_key = dcrypt.decrypt(config['Access_Key'])
        self.secret_key = dcrypt.decrypt(config['Secret_key'])
        self.region = config['Region']

    def upload_doc_to_s3(self,file_path,bucket_name,output_name):
        s3 = boto3.client('s3',
                          aws_access_key_id=self.access_key,
                          aws_secret_access_key=self.secret_key,
                          region_name=self.region)
        return s3.upload_file(file_path,bucket_name,output_name)
