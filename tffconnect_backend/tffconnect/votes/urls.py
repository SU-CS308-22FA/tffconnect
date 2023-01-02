from django.urls import path

from . import views

app_name = "votes"

urlpatterns = [
    path("votes/", views.ViewVotes.as_view()),
]
