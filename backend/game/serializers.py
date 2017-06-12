from game.models import Game, Package, Platform
from rest_framework import serializers
from information.serializers import InformationSerializer
from media.serializers import ImageSerializer
from media.serializers import VideoSerializer
from media.serializers import SoundtrackSerializer
from core.validators import IMAGE_ALLOWED_EXTENSIONS

from core.settings import MEDIA_ROOT
from PIL import Image
import base64
import os
from django.core.files.images import ImageFile


class PlatformSerializer(serializers.ModelSerializer):

    class Meta:
        model = Platform
        fields = ['name', 'extensions', 'icon']


class PackageSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many=True, read_only=True)
    game_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Package
        fields = ['package', 'platforms', 'game_id']


class GameSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField(read_only=True)
    information = InformationSerializer(required=False)
    packages = PackageSerializer(many=True, read_only=True)
    media_image = ImageSerializer(many=True, read_only=True)
    media_video = VideoSerializer(many=True, read_only=True)
    media_soundtrack = SoundtrackSerializer(many=True, read_only=True)

# Fields to submit image for game
    image_name = serializers.CharField(write_only=True)
    image_data = serializers.CharField(write_only=True)
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
                  'media_soundtrack',
                  'cover_image',
                  'slide_image',
                  'card_image',
                  'image_name',
                  'extension',
                  'image_data',
                  ]

    def create(self, validated_data):
        validated_data['cover_image'] = self.__image_create__(validated_data)
        game_saved = None
        try:
            information = validated_data.pop('information', {})
            game_saved = Game.objects.create(**validated_data)
            information['game_id'] = game_saved.pk
            information_serial = InformationSerializer(data=information)
            if information_serial.is_valid():
                information_serial.save()

        finally:
            # Always remove the temp file
            validated_data['cover_image'].close()
            os.remove(validated_data['cover_image'].name)

        return game_saved

    def validate(self, data):
        if data.get('extension') not in IMAGE_ALLOWED_EXTENSIONS:
            raise serializers.ValidationError("invalid image extension")
        return data

    def __image_decode__(self, name, extension, data):
        raw_data = Image.io.BytesIO(base64.b64decode(data))
        float_image = Image.open(raw_data)
        float_image.save("{}/images/{}.{}".format(MEDIA_ROOT, name, extension))
        float_image.close()

    def __image_create__(self, validated_data):
        name = validated_data.pop('image_name', 'temp')
        extension = validated_data.pop('extension', 'jpg')
        data = validated_data.pop('image_data', b'0x00')
        self.__image_decode__(name, extension, data)
        img = open('{}/images/{}.{}'.format(MEDIA_ROOT, name, extension), 'rb')
        return ImageFile(img)
