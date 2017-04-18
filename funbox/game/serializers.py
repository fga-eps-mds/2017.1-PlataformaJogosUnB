from game.models import Game, Package, Platform
from rest_framework import serializers
from information.serializers import InformationSerializer
# from media.serializers import MediaSerializer


class PlatformSerializer(serializers.ModelSerializer):

    class Meta:
        model = Platform
        fields = ['name', 'extensions', 'icon']


class PackageSerializer(serializers.ModelSerializer):
    # platform = PlatformSerializer()

    class Meta:
        model = Package
        fields = ['package']


class GameSerializer(serializers.ModelSerializer):
    information = InformationSerializer()
    packages = PackageSerializer(many=True)
    # medias = MediaSerializer()

    class Meta:
        model = Game
        fields = ['name',
                  'game_version',
                  'official_repository',
                  'information',
                  'packages']
