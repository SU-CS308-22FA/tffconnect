from rest_framework import serializers

from .models import UserVotes


class VotesSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserVotes
        fields = ['id', 'user_id', 'game_id']

    def create(self, validated_data):
        """
        Create and return a new `UserVotes` instance, given the validated data.
        """
        return UserVotes.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `UserVotes` instance, given the validated data.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.game_id = validated_data.get('game_id', instance.game_id)
        instance.save()
        return instance

    def delete(self, validated_data):
        return UserVotes.objects.delete(**validated_data)
