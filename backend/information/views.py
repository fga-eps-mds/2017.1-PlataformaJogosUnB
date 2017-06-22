from functools import reduce
from game.serializers import GameSerializer
from information.models import Genre, Information
from information.serializers import GenreSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class GenreViewList(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_class = (AllowAny)


class GenresApi(APIView):
    ordering_fields = ('visualization', '-visualization',
                       'downloads', '-downloads')

    def get(self, request):
        ordering = request.GET.get('ordering', None)
        genres = reduce(self.__group_genres__, Information.objects.all(), {})
        for key in genres:
            self.__sort__(ordering, genres[key])
            genres[key] = GameSerializer(genres[key], many=True).data
        return Response(genres)

    def __sort__(self, ordering, data):
        if ordering and ordering in self.ordering_fields:
            factor = 1
            if ordering[0] == '-':
                ordering = ordering[1:]
                factor *= -1
            data.sort(key=lambda x: factor * getattr(x, ordering))

    def __group_genres__(self, dir_genres, information):
        for genre in information.genres.all():
            if genre.name in dir_genres:
                dir_genres[genre.name] += [information.game]
            else:
                dir_genres[genre.name] = [information.game]
        return dir_genres
