from django.db import models

class News(models.Model):
    id = models.AutoField(primary_key=True)
    header = models.CharField(max_length=100)
    date = models.DateTimeField('date published')
    image = models.ImageField(upload_to='uploads/', height_field=None, width_field=None, max_length=100)
    details = models.CharField(max_length=1000)

    def __str__(self):
        return "News_" + str(self.id)