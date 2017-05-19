from media.models import Media
from media.serializers import MediaSerializer
from rest_framework.response import Response
from rest_framework.decorators import APIView


class MediaList(APIView):

    def get(self, request):
        medias = Media.objects.all()
        serializer = MediaSerializer(medias, many=True)
        return Response(serializer.data)
