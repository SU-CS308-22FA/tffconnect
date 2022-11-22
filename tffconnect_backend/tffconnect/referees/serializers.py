from rest_framework import serializers
from .models import Referees #bu gerekli mi

class RefereesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Referees
        fields = ('name', 'surname', 'city', 'classification') #choose which fields to take in json package (?)