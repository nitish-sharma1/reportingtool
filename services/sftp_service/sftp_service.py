import paramiko
import time
from reportingtool.services.configservice.configservice import ConfigService


class SftpService:
    def __init__(self, config_name):
        conf = ConfigService()
        config = conf.getconfig(config_name)
        self.hostname = config['hostname']
        self.port = config['port']
        self.username = config['username']
        self.password = config['password']
        self.remote_file_path = config['remote_file_path']

    def send_file_via_sftp(self, file_path):
        try:
            transport = paramiko.Transport((self.hostname, self.port))
            transport.connect(username=self.username, password=self.password)
            sftp = paramiko.SFTPClient.from_transport(transport)
            sftp.put(file_path, self.remote_file_path)
            sftp.close()
            transport.close()

        except Exception as e:
            print(f'An error occurred: {e}')
