from game.models import Game
from rest_framework import serializers
from information.serializers import InformationSerializer


class GameSerializer(serializers.ModelSerializer):
    information = InformationSerializer()

    class Meta:
        model = Game
        fields = ['name', 'game_version', 'official_repository', 'information']
