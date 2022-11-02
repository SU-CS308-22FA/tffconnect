from django.urls import path
from rest_framework.authtoken import views as authtoken_views

from . import views

app_name = "users"

urlpatterns = [
    path("users/signup/", views.SignUpView.as_view()),
    path("users/me/", views.MeView.as_view()),
]
