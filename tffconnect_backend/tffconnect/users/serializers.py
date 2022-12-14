from rest_framework import serializers
from google.oauth2 import id_token as google_id_token
from google.auth.transport import requests
from google.auth.exceptions import GoogleAuthError

from tffconnect.teams.models import Team
from tffconnect.teams.serializers import TeamSerializer
from . import models, constants


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    favorite_team = TeamSerializer(required=False, allow_null=True)

    class Meta:
        model = models.User
        fields = ["id", "username", "first_name", "last_name", "password", "favorite_team"]

    def create(self, validated_data):
        favorite_team_data = validated_data.pop("favorite_team", None)
        if favorite_team_data:
            favorite_team = Team.objects.get(name=favorite_team_data["name"])
            validated_data["favorite_team"] = favorite_team
        user = models.User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        favorite_team_data = validated_data.pop("favorite_team", None)
        if favorite_team_data:
            favorite_team = Team.objects.get(name=favorite_team_data["name"])
            instance.favorite_team = favorite_team
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
