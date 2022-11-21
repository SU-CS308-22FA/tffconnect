from django.db import models
from tffconnect.users.models import User


# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=30)  # should we make this field lenght bit larger? 
    is_finished = models.BooleanField()
    start_datetime = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=30)  # should we make this field lenght bit larger?
    location = models.CharField(max_length=30)  # should we make this field lenght bit larger?
    budget = models.PositiveIntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    # imageField  upload / or URL  image upload (base64?)
    # project eklendiği tarih = date feild on add update
