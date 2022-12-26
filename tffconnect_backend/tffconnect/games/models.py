from django.db import models
from ..referees.models import Referees


class Games(models.Model):
    referee_id = models.ForeignKey(Referees, on_delete=models.CASCADE)
    game_name = models.CharField(max_length=100)
    game_date = models.DateField('date played')
    game_result = models.CharField(max_length=100)

    def __str__(self):
        return "Games_" + str(self.id)


class GameComment(models.Model):
    game = models.ForeignKey(Games, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    comment = models.TextField()
    is_reported = models.BooleanField(default=False)

    def __str__(self):
        return f"Comment on {self.game} by {self.user}"
