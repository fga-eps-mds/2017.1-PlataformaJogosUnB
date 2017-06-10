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
    developers = DeveloperSerializer(many=True, required=False)
    awards = AwardSerializer(many=True, required=False)
    genres = GenreSerializer(many=True, required=False)
    game_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Information
        fields = ['description',
                  'launch_year',
                  'semester',
                  'developers',
                  'awards',
                  'genres',
                  'game_id',
                  ]
