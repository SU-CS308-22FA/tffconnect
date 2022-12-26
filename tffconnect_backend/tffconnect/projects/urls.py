from django.urls import path

from . import views
app_name = "projects"

urlpatterns = [
    path("projects/", views.ProjectListCreateView.as_view()),
    path("projects/edit/<int:pk>/", views.ProjectRetrieveUpdateDestroyView.as_view()),
]
