from information.models import Information, Award, Developer
from rest_framework import serializers


class AwardSerialization(serializers.ModelSerializer):

    class Meta:
        model = Award
        fields = ['name', 'year', 'place']


class DeveloperSerialization(serializers.ModelSerializer):

    class Meta:
        model = Developer
        fields = ['name', 'avatar', 'login', 'email', 'github_page']


class InformationSerializer(serializers.ModelSerializer):
    developers = DeveloperSerialization(many=True)
    awards = AwardSerialization(many=True)

    class Meta:
        model = Information
        fields = ['description',
                  'launch_year',
                  'developers',
                  'awards']
