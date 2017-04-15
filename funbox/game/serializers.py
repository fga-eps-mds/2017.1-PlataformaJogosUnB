from game.models import Game, Package, Platform
from rest_framework import serializers
from information.serializers import InformationSerializer


class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ['name', 'extensions']


class PackageSerializer(serializers.ModelSerializer):
    platform = PlatformSerializer()
    class Meta:
        model = Package
        fields = ['package', 'platform']

class GameSerializer(serializers.ModelSerializer):
    information = InformationSerializer()

    class Meta:
        model = Game
        fields = ['name', 'game_version', 'official_repository', 'information', 'packages']
