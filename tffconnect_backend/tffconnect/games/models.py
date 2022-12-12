from django.db import models
from ..referees.models import Referees

GAME_CHOICES = (
    ('Berabere', 'Berabere'),
    ('Takım 1 kazandı!', 'Takım 1 kazandı!'),
    ('Takım 2 kazandı!', 'Takım 2 kazandı!'),
)


class Games(models.Model):
    id = models.AutoField(primary_key=True)
    referee_id = models.ForeignKey(Referees, on_delete=models.CASCADE)
    game_name = models.CharField(max_length=100)
    game_date = models.DateField('date played')
    game_result = models.CharField(choices=GAME_CHOICES, max_length=100)

    def __str__(self):
        return "Games_" + str(self.id)
