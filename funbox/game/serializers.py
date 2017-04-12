from game.models import Game
from rest_framework import serializers


class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game
        fields = ['name', 'game_version', 'official_repository']
