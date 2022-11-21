from rest_framework import serializers
from . import models


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Project
        fields = (
            'name',
            'is_finished',
            'proposal_date',
            'start_date',
            'end_date',
            'description',
            'location',
            'budget',
            'owner',
            'is_confirmed_by_tff',
            'confirmation_datetime'
        )

    def create(self, validated_data):
        project = models.Project.objects.create(**validated_data)
        return project
