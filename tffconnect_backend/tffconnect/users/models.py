from django.contrib.auth.models import AbstractUser
from django.db import models

from tffconnect.teams.models import Team


class User(AbstractUser):
    # TODO add our project specific user fields
    username = models.EmailField(unique=True)
    favorite_team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True)

    EMAIL_FIELD = "username"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []
