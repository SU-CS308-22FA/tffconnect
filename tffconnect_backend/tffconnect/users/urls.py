from django.urls import path
from rest_framework.authtoken import views as authtoken_views

from . import views

app_name = "users"

urlpatterns = [
    path("users/login/", authtoken_views.obtain_auth_token),
    path("users/signup/", views.SignUpView.as_view()),
    path("users/google-signup-login/", views.GoogleSignupLoginView.as_view()),
    path("users/me/", views.MeView.as_view()),
]
