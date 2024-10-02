from cryptography.fernet import Fernet
import os


class Encryption_Service:
    def __init__(self):
        self.key = os.getenv('ENCRYPTION_SECRET').encode('utf-8')

    def encrypt(self, plaintext):
        f = Fernet(self.key)
        token = f.encrypt(plaintext.encode('utf-8'))
        return token

    def decrypt(self, encoded_string):
        f = Fernet(self.key)
        plain_text = f.decrypt(encoded_string.encode('utf-8'))
        return plain_text.decode('utf-8')


