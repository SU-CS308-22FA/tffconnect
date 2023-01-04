from django.db import models
from ..referees.models import Referees


class Games(models.Model):
    referee_id = models.ForeignKey(Referees, on_delete=models.CASCADE)
    game_name = models.CharField(max_length=100)
    game_date = models.DateField('date played')
    game_result = models.CharField(max_length=100)
    referee_rating = models.FloatField(default=0)
    rating_count = models.IntegerField(default=0)

    def __str__(self):
        return "Games_" + str(self.id)
