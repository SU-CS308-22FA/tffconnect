from rest_framework import serializers

from .models import Team


class TeamSerializer(serializers.ModelSerializer):
    league = serializers.CharField(read_only=True)

    class Meta:
        model = Team
        fields = ["name", "league"]

    def validate_league(self, league):
        if not Team.objects.filter(league=league).exists():
            raise serializers.ValidationError({"league": "League does not exist."})
        return league
