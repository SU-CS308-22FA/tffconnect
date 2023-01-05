from django.contrib import admin

# Register your models here.
from .models import Project, ProjectComment

admin.site.register(Project)
admin.site.register(ProjectComment)
