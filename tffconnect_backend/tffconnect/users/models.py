from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # TODO add our project specific user fields
    username = models.EmailField(unique=True)

    EMAIL_FIELD = "username"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []
