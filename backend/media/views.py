from rest_framework import generics
from media.serializers import (
    VideoSerializer,
    ImageSerializer,
    SoundtrackSerializer
)


class ImageCreateView(generics.CreateAPIView, generics.UpdateAPIView):
    serializer_class = ImageSerializer


class VideoCreateView(generics.CreateAPIView, generics.UpdateAPIView):
    serializer_class = VideoSerializer


class SoundtrackCreateView(generics.CreateAPIView, generics.UpdateAPIView):
    serializer_class = SoundtrackSerializer
