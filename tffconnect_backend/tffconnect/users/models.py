from django.contrib.auth.models import AbstractUser
from django.db import models
from ..news.models import News


class User(AbstractUser):
    # TODO add our project specific user fields
    username = models.EmailField(unique=True)
    favorite_items = models.ManyToManyField(News)

    EMAIL_FIELD = "username"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []
