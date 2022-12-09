from django.urls import include, path
from . import views

app_name = "referees"


urlpatterns = [
    path('referees/', views.RefereesList.as_view())
]
