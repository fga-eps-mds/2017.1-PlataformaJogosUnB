from rest_framework import generics
from information.models import Genre
from information.serializers import GenreSerializer
from rest_framework.permissions import AllowAny


class GenreViewList(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_class = (AllowAny)
