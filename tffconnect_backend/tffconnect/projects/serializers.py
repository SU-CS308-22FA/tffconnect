from rest_framework import serializers
from . import models


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Project
        fields = (
            'name',
            'is_finished',
            'start_datetime',
            'description',
            'location',
            'budget',
            'owner'
            )

    def create(self, validated_data):
        project = models.Project.objects.create(**validated_data)
        return project
