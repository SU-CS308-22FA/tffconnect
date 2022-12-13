from django.urls import path

from .views import ListTeamsView

app_name = "teams"

urlpatterns = [
    path("teams/", ListTeamsView.as_view()),
]
