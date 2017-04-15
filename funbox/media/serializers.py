from rest_framework import serializers
from media.models import Media


class MediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Media
        fields = ['image', 'video', 'soundtrack']
