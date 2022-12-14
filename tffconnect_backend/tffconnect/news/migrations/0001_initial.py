# Generated by Django 4.1.2 on 2022-11-20 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('header', models.CharField(max_length=100)),
                ('date', models.DateTimeField(verbose_name='date published')),
                ('image', models.ImageField(upload_to='news_images/')),
                ('details', models.CharField(max_length=1000)),
            ],
        ),
    ]
