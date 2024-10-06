import logging
import os


class Logger:
    def __init__(self, name='mylogger', level=logging.DEBUG, log_file='app.log'):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)

        if not os.path.exists('logs'):
            os.mkdir('logs')
        log_file = logging.FileHandler(f'logs/{log_file}')
        log_file.setLevel(level)

        console_log = logging.StreamHandler()
        console_log.setLevel(logging.INFO)
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        log_file.setFormatter(formatter)
        console_log.setFormatter(formatter)
        self.logger.addHandler(log_file)
        self.logger.addHandler(console_log)

    def debug(self, message):
        self.logger.debug(message)

    def info(self, message):
        self.logger.info(message)

    def warning(self, message):
        self.logger.warning(message)

    def error(self, message):
        self.logger.error(message)

    def critical(self, message):
        self.logger.critical(message)
