import smtplib
from reportingtool.services.configservice.configservice import ConfigService
from reportingtool.services.encryptionservice.encryptionservice import Encryption_Service


class SMTPService:

    @staticmethod
    def send_mail(to, subject, body):
        conf = ConfigService()
        dcpt = Encryption_Service()
        config = conf.getconfig('smtpconfig')
        smtp_server = config['Smtp_Server']
        app_pass = dcpt.decrypt(config['App_Password'])
        login_email = config['Login_Email']
        with smtplib.SMTP(smtp_server) as connection:
            connection.starttls()
            connection.login(user=login_email, password=app_pass)
            connection.sendmail(from_addr=login_email, to_addrs=to, msg=f'Subject : {subject} \n\n {body}')



