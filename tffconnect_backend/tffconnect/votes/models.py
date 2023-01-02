from django.db import models
from ..games.models import Games
from ..users.models import User


class UserVotes(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    game_id = models.ForeignKey(Games, on_delete=models.CASCADE)

    def __str__(self):
        return "User" + str(self.user_id) + "_VoteFor_Game" + str(self.game_id)
