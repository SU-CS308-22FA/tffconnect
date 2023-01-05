from django.db import models
from tffconnect.users.models import User


class Project(models.Model):
    name = models.CharField(max_length=255)
    is_finished = models.BooleanField()
    proposal_date = models.DateTimeField(auto_now_add=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    budget = models.PositiveIntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    is_confirmed_by_tff = models.BooleanField()
    confirmation_datetime = models.DateTimeField(auto_now_add=True)


class ProjectComment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)  # char field?
    text_body = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)

    def approve(self):
        self.approved = True
        self.save()

    def __str__(self):
        return self.text_body
