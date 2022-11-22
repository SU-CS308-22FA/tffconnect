from django.urls import path

from . import views
app_name = "projects"

urlpatterns = [
    path("projects/", views.ProjectListCreateView.as_view()),
]
