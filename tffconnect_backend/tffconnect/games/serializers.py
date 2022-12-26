from rest_framework import serializers

from .models import Games, GameComment


class GamesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Games
        fields = ['id', 'referee_id', 'game_name', 'game_date', 'game_result']

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
        instance.save()
        return instance


class GameCommentSerializer(serializers.ModelSerializer):
    user_full_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = GameComment
        fields = ['id', 'game', 'user', 'user_full_name', 'comment', 'is_reported']
        read_only_fields = ['user', 'game']

    def create(self, validated_data):
        user = self.context['request'].user
        game_id = self.context['view'].kwargs['id']
        validated_data['user'] = user
        validated_data['game'] = Games.objects.get(id=game_id)
        return GameComment.objects.create(**validated_data)
