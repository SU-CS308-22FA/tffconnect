from rest_framework import serializers

from .models import UserFavorites


class FavoritesSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserFavorites
        fields = ['id', 'user_id', 'news_id']

    def create(self, validated_data):
        """
        Create and return a new `UserFavorites` instance, given the validated data.
        """
        return UserFavorites.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `UserFavorites` instance, given the validated data.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.news_id = validated_data.get('news_id', instance.news_id)
        instance.save()
        return instance

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
