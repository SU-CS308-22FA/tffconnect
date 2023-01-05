from django.urls import path

from . import views

app_name = "games"

urlpatterns = [
    path("games/", views.AddGames.as_view()),
    path("games/<int:id>/", views.ModifyGames.as_view()),
    path("games/<int:id>/comments/", views.GameCommentListCreateAPIView.as_view()),
    path("games/<int:id>/comments/<int:pk>/", views.GameCommentRetrieveUpdateDestroyAPIView.as_view()),
]
