from rest_framework import serializers
from google.oauth2 import id_token as google_id_token
from google.auth.transport import requests
from google.auth.exceptions import GoogleAuthError

from . import models, constants


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = models.User
        fields = ["id", "username", "first_name", "last_name", "password"]

    def create(self, validated_data):
        user = models.User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.save()
        return instance


class GoogleSignupLoginSerializer(serializers.Serializer):
    credential = serializers.CharField()

    def validate(self, data):
        credential = data["credential"]
        try:
            id_info = google_id_token.verify_oauth2_token(
                credential, requests.Request(), constants.FRONTEND_GOOGLE_CLIENT_ID
            )
        except (ValueError, GoogleAuthError) as e:
            raise serializers.ValidationError({"credential": f"Invalid token: {e}"})

        user, _ = models.User.objects.get_or_create(
            username=id_info["email"],
            defaults={
                "first_name": id_info["given_name"],
                "last_name": id_info["family_name"],
            },
        )
        data["user"] = user
        return data
