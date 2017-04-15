from information.models import Information, Award, Developer
from media.serializers import MediaSerializer
from rest_framework import serializers


class DeveloperSerialization(serializers.ModelSerializer):

    class Meta:
        model = Developer
        fields = ['name', 'avatar', 'login', 'email', 'github_page']


class AwardSerialization(serializers.ModelSerializer):

    class Meta:
        model = Award
        fields = ['name', 'year', 'place']


class InformationSerializer(serializers.ModelSerializer):
    developers = DeveloperSerialization(many=True)
    awards = AwardSerialization(many=True)
    media = MediaSerializer()

    class Meta:
        model = Information
        fields = ['description',
                  'launch_year',
                  'developers',
                  'awards',
                  'media']
