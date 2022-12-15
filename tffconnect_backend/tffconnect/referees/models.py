from django.db import models


class Referees(models.Model):

    # id is the primer key automatically
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    classification = models.CharField(max_length=30)

    def __str__(self):
        return "Referee_" + str(self.id)
