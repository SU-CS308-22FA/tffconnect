from django.urls import path

from . import views

app_name = "news"

urlpatterns = [
    path("news/", views.index),
    path("news/AddNews/", views.AddNews.as_view()),
    path("news/<int:id>/", views.ModifyNews.as_view()),
]
