from rest_framework import serializers
from media.models import Media, Image, Video, Soundtrack


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = ['image', 'role']


class VideoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = ['video', 'role']


class SoundtrackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Soundtrack
        fields = ['soundtrack', 'role']


class MediaSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    videos = VideoSerializer(many=True)
    soundtrack = SoundtrackSerializer(many=True)

    class Meta:
        model = Media
        fields = ['images', 'videos', 'soundtrack']
