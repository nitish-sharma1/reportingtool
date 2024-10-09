import smtplib
import os
from reportingtool.services.configservice.configservice import ConfigService
from reportingtool.services.encryptionservice.encryptionservice import Encryption_Service
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders


class SMTPService:

    @staticmethod
    def send_mail(to, subject, body, attachment_path):
        conf = ConfigService()
        decrypt = Encryption_Service()
        config = conf.getconfig('smtpconfig')
        smtp_server = config['Smtp_Server']
        app_pass = decrypt.decrypt(config['App_Password'])
        login_email = config['Login_Email']
        msg = MIMEMultipart()
        # storing the senders email address
        msg['From'] = login_email
        # storing the receivers email address
        msg['To'] = to
        # storing the subject
        msg['Subject'] = subject
        # string to store the body of the mail
        body = body
        # attach the body with the msg instance
        msg.attach(MIMEText(body, 'plain'))
        file_name = os.path.basename(attachment_path).split('/')[-1]
        attachment = open(attachment_path, "rb")
        # instance of MIMEBase and named as p
        p = MIMEBase('application', 'octet-stream')
        # To change the payload into encoded form
        p.set_payload(attachment.read())
        # encode into base64
        encoders.encode_base64(p)
        p.add_header('Content-Disposition', "attachment; filename= %s" % file_name)
        # attach the instance 'p' to instance 'msg'
        msg.attach(p)

        with smtplib.SMTP(smtp_server) as connection:
            connection.starttls()
            connection.login(user=login_email, password=app_pass)
            text = msg.as_string()
            connection.sendmail(from_addr=login_email, to_addrs=to, msg=text)
