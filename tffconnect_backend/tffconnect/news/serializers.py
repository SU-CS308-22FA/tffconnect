from rest_framework import serializers

from .models import News

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'header', 'date', 'image', 'details']

    def create(self, validated_data):
        """
        Create and return a new `News` instance, given the validated data.
        """
        return News.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `News` instance, given the validated data.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.header = validated_data.get('header', instance.header)
        instance.date = validated_data.get('date', instance.date)
        instance.image = validated_data.get('image', instance.image)
        instance.details = validated_data.get('details', instance.details)
        instance.save()
        return instance
