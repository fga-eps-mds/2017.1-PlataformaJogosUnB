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

    def create(self, validated_data):
        developers = validated_data.pop('developers', [])
        awards =  validated_data.pop('awards', [])
        genres =  validated_data.pop('genres', [])
        information = Information.objects.create(**validated_data)


        for developer in developers:
            new_developer = Developer.objects.get_or_create(**developer)
            information.developers.add(new_developer[0])

        for award in awards:
            new_award = Award.objects.get_or_create(**award)
            information.awards.add(new_award[0])

        for genre in genres:
            new_genre = Genre.objects.get_or_create(**genre)
            information.genres.add(new_genre[0])

        return information
