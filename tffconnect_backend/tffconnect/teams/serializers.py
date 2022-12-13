from rest_framework import serializers

from .models import Team


class TeamSerializer(serializers.ModelSerializer):
    league = serializers.CharField(read_only=True)

    class Meta:
        model = Team
        fields = ["name", "league"]

    def validate_name(self, name):
        if not Team.objects.filter(name=name).exists():
            raise serializers.ValidationError({"name": "Team does not exist."})
        return name
