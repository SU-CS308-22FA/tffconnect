from django.urls import path

from . import views
app_name = "projects"

urlpatterns = [
    path("projects/", views.ProjectListCreateView.as_view()),
    path("projects/edit/<int:pk>/", views.ProjectRetrieveUpdateDestroyView.as_view()),
    path("projects/theproject/<int:pk>/", views.ProjectListCreateView.as_view()),
    path("projects/comments/", views.ProjectCommentListCreateView.as_view()),
    path("projects/comments/<int:pk>/", views.ProjectCommentRetrieveUpdateDestroyView.as_view()),
]
