from rest_framework import serializers
from . import models


class RefereesSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Referees
        fields = (
                'id',
                'name',
                'surname',
                'city',
                'classification'
        )

def create(self, validated_data):
        referee = models.Referees.objects.create(**validated_data)
        return referee

def delete(self, validated_data):
        referee = models.Referees.objects.delete(**validated_data)
        return referee
