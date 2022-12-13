from django.urls import path

from . import views

app_name = "favorites"

urlpatterns = [
    path("favorites/", views.AddFavorites.as_view()),
    path("favorites/ModifyFavorites/<int:id>/", views.ModifyFavorites.as_view()),
]
