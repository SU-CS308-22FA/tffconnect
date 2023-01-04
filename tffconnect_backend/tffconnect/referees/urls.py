from django.urls import path
from . import views

app_name = "referees"


urlpatterns = [
    path('referees/edit/<int:pk>/', views.RefereesListDelete.as_view()),
    path('referees/', views.RefereesList.as_view())
]
