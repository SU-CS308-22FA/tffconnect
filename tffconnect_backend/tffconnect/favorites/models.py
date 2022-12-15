from django.db import models
from ..news.models import News
from ..users.models import User


class UserFavorites(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    news_id = models.ForeignKey(News, on_delete=models.CASCADE)

    def __str__(self):
        return "User" + str(self.user_id) + "_Favorites"
