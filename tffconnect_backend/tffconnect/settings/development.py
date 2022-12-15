from .base import *  # noqa: F403


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-)uqarq$7-uixs37yv5j6b(i4&p05(29ss%yjikiofucjqd+=wv"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",  # noqa: F405
    }
}
