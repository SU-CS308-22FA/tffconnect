from django.urls import path

from . import views

app_name = "games"

urlpatterns = [
    path("games/", views.AddGames.as_view()),
    path("games/<int:id>/", views.ModifyGames.as_view()),
]
