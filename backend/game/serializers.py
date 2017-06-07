from game.models import Game, Package, Platform
from rest_framework import serializers
from information.serializers import InformationSerializer
from media.serializers import ImageSerializer
from media.serializers import VideoSerializer
from media.serializers import SoundtrackSerializer
from core.validators import IMAGE_ALLOWED_EXTENSIONS


class PlatformSerializer(serializers.ModelSerializer):

    class Meta:
        model = Platform
        fields = ['name', 'extensions', 'icon']


class PackageSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many=True)

    class Meta:
        model = Package
        fields = ['package', 'platforms']


def valid_me(self, value):
    print('here')


class GameSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField(read_only=True)
    information = InformationSerializer(read_only=True)
    packages = PackageSerializer(many=True, read_only=True)
    media_image = ImageSerializer(many=True, read_only=True)
    media_video = VideoSerializer(many=True, read_only=True)
    media_soundtrack = SoundtrackSerializer(many=True, read_only=True)
    image_name = serializers.CharField(write_only=True)
    data = serializers.CharField(write_only=True)
    extension = serializers.CharField(write_only=True)

    class Meta:
        model = Game
        fields = ['pk',
                  'name',
                  'version',
                  'official_repository',
                  'game_activated',
                  'information',
                  'packages',
                  'media_image',
                  'media_video',
                  'cover_image',
                  'slide_image',
                  'card_image',
                  'media_soundtrack',
                  'image_name',
                  'extension',
                  'data',
                  ]

    def create(self, validated_data):
        from game.factory import GameFactory
        print('\n\narr\n')
        return GameFactory()

    def validate(self, data):
        if data.get('extension') not in IMAGE_ALLOWED_EXTENSIONS:
            raise serializers.ValidationError("invalid image extension")
        return data
