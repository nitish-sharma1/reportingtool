import datetime


class Datetime_Service:
    def __init__(self):

        self.datetime_now = datetime.datetime.now()

    def get_current_time_str(self):
        concurrent_time = str(self.datetime_now.time())
        return concurrent_time[0:5]

    def get_current_day(self):
        days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        current_day = self.datetime_now.day
        return days[current_day]
