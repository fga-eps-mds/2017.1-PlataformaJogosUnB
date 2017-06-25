from rest_framework import serializers
from media.models import Image, Video, Soundtrack


class ImageSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Image
        fields = ['image', 'slide', 'role', 'game_id']


class VideoSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Video
        fields = ['video', 'role', 'game_id']


class SoundtrackSerializer(serializers.ModelSerializer):
    game_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Soundtrack
        fields = ['soundtrack', 'role', 'game_id']
