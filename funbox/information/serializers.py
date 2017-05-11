from information.models import Information, Award, Developer, Genre
from rest_framework import serializers


class AwardSerialization(serializers.ModelSerializer):

    class Meta:
        model = Award
        fields = ['name', 'year', 'place']


class DeveloperSerialization(serializers.ModelSerializer):

    class Meta:
        model = Developer
        fields = ['name', 'avatar', 'login', 'email', 'github_page']


class GenreSerialization(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ['name', 'description']


class InformationSerializer(serializers.ModelSerializer):
    developers = DeveloperSerialization(many=True)
    awards = AwardSerialization(many=True)
    genres = GenreSerialization(many=True)

    class Meta:
        model = Information
        fields = ['description',
                  'launch_year',
                  'developers',
                  'awards',
                  'genres']
