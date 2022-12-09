from rest_framework import serializers
from .models import Referees


class RefereesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Referees
        fields = ('name', 'surname', 'city', 'classification')
