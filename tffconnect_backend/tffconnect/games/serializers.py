from rest_framework import serializers

from .models import Games


class GamesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Games
        fields = ['id', 'referee_id', 'game_name', 'game_date', 'game_result', 'referee_rating', 'rating_count']

    def create(self, validated_data):
        """
        Create and return a new `Games` instance, given the validated data.
        """
        return Games.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Games` instance, given the validated data.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.referee_id = validated_data.get('referee_id', instance.referee_id)
        instance.game_name = validated_data.get('game_name', instance.game_name)
        instance.game_date = validated_data.get('game_date', instance.game_date)
        instance.game_result = validated_data.get('game_result', instance.game_result)
        instance.referee_rating = validated_data.get('referee_rating', instance.referee_rating)
        instance.rating_count = validated_data.get('rating_count', instance.rating_count)
        instance.save()
        return instance
