from django.db import models


class Referees(models.Model):

    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    classification = models.CharField(max_length=30)
