from game.models import Game, Package, Platform
from rest_framework import serializers
from information.serializers import InformationSerializer
from media.serializers import ImageSerializer
from media.serializers import VideoSerializer
from media.serializers import SoundtrackSerializer


class PlatformSerializer(serializers.ModelSerializer):

    class Meta:
        model = Platform
        fields = ['name', 'extensions', 'icon']


class PackageSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many=True, read_only=True)

    class Meta:
        model = Package
        fields = ['package', 'platforms']


class GameSerializer(serializers.ModelSerializer):
    information = InformationSerializer(read_only=True)
    packages = PackageSerializer(many=True, read_only=True)
    media_image = ImageSerializer(many=True, read_only=True)
    media_video = VideoSerializer(many=True, read_only=True)
    media_soundtrack = SoundtrackSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ['pk',
                  'name',
                  'cover_image',
                  'slide_image',
                  'card_image',
                  'version',
                  'official_repository',
                  'game_activated',
                  'information',
                  'packages',
                  'media_image',
                  'media_video',
                  'media_soundtrack']
