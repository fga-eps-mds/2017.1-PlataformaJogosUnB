from game.models import Game, Package, Platform
from rest_framework import serializers
from information.serializers import InformationSerializer
# from media.serializers import MediaSerializer


class PlatformSerializer(serializers.ModelSerializer):

    class Meta:
        model = Platform
        fields = ['name', 'extensions', 'icon']


class PackageSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many=True)

    class Meta:
        model = Package
        fields = ['package', 'platforms']


class GameSerializer(serializers.ModelSerializer):
    information = InformationSerializer()
    packages = PackageSerializer(many=True)
    # media = MediaSerializer(many=True)

    class Meta:
        model = Game
        fields = ['name',
                  'game_version',
                  'official_repository',
                  'information',
                  'packages']
