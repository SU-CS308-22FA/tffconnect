# Generated by Django 4.1.2 on 2022-12-11 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('referees', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='referees',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
