from django.db import models

class ProcessData(models.Model):
    timestamp = models.DateTimeField()
    electricity = models.FloatField()
    water = models.FloatField()
    heat = models.FloatField()
    gas = models.FloatField()

    class Meta:
        db_table = 'process_data'