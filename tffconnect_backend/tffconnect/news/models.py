from django.db import models

def user_directory_path(instance, filename):
  
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'news_{0}/{1}'.format(instance.news.id, filename)

class News(models.Model):
    id = models.AutoField(primary_key=True)
    header = models.CharField(max_length=100)
    date = models.DateTimeField('date published')
    image = models.ImageField(upload_to='uploads/', height_field=None, width_field=None, max_length=100)
    details = models.CharField(max_length=1000)

    def __str__(self):
        return "News_" + str(self.id)