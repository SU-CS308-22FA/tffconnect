from django.urls import path
from . import views

app_name = "referees"


urlpatterns = [
    path('referees/', views.RefereesList.as_view())
]
