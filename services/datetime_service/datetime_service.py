import datetime


class Datetime_Service:
    def __init__(self):

        self.datetime_now = datetime.datetime.now()

    def get_current_time_str(self):
        concurrent_time = str(self.datetime_now.time())
        return concurrent_time[0:5]

    @staticmethod
    def get_current_day():
        days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        today = datetime.date.today()
        current_day = today.weekday()
        return days[current_day]

