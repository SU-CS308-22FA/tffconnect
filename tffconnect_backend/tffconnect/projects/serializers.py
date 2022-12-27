from rest_framework import serializers
from . import models


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Project
        fields = (
            'id',
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

    def delete(self, validated_data):
        project = models.Project.objects.delete(**validated_data)
        return project

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.is_finished = validated_data.get('is_finished', instance.is_finished)
        instance.proposal_date = validated_data.get('proposal_date', instance.proposal_date)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.description = validated_data.get('description', instance.description)
        instance.location = validated_data.get('location', instance.location)
        instance.budget = validated_data.get('budget', instance.budget)
        instance.owner = validated_data.get('owner', instance.owner)
        instance.is_confirmed_by_tff = validated_data.get('is_confirmed_by_tff', instance.is_confirmed_by_tff)
        instance.confirmation_datetime = validated_data.get('confirmation_datetime', instance.confirmation_datetime)
        instance.save()
        return instance


class ProjectCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ProjectComment
        fields = (
            'id',
            'project',
            'author',
            'text_body',
            'date_added',
            'is_approved'
        )

    def create(self, validated_data):
        project_comment = models.ProjectComment.objects.create(**validated_data)
        return project_comment

    def delete(self, validated_data):
        project_comment = models.ProjectComment.objects.delete(**validated_data)
        return project_comment

    def update(self, instance, validated_data):
        instance.project = validated_data.get('project', instance.project)
        instance.author = validated_data.get('author', instance.author)
        instance.text_body = validated_data.get('text_body', instance.text_body)
        instance.date_added = validated_data.get('date_added', instance.date_added)
        instance.is_approved = validated_data.get('is_approved', instance.is_approved)
        instance.save()
        return instance
