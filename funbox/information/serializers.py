from information.models import Information, Award, Developer, Genre
from rest_framework import serializers


class AwardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Award
        fields = ['name', 'year', 'place']


class DeveloperSerializer(serializers.ModelSerializer):

    class Meta:
        model = Developer
        fields = ['name', 'avatar', 'login', 'email', 'github_page']


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ['name', 'description']


class InformationSerializer(serializers.ModelSerializer):
    developers = DeveloperSerializer(many=True)
    awards = AwardSerializer(many=True)
    genres = GenreSerializer(many=True)

    class Meta:
        model = Information
        fields = ['description',
                  'launch_year',
                  'developers',
                  'awards',
                  'genres']
