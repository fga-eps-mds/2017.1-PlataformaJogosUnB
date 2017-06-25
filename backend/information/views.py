from information.models import Rating, Information, Genre
from information.serializers import GenreSerializer
from rest_framework import permissions
from rest_framework import status
from django.shortcuts import get_object_or_404
from functools import reduce
from game.serializers import GameSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView


class VoteView(APIView):

    permission_classes = (permissions.AllowAny, )

    def post(self, request, pk=None):
        user_voter = str(request.user)
        information = get_object_or_404(Information, pk=pk)
        try:
            rating = Rating.objects.get(
                user_voter=user_voter)
            rating.delete()
        except BaseException:
            rating = None

        rating = Rating(vote=request.data['vote'],
                        user_voter=user_voter,
                        information=information)
        try:
            rating.save()
#            logout(request)
            return Response({'status': 'Vote successfully done.'},
                            status.HTTP_201_CREATED,
                            template_name="game/index.html")
        except BaseException:
            return Response({'status': 'The vote could not be done.'},
                            status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk=None):
        information = get_object_or_404(Information, pk=pk)
        vote_count = {}
        vote_count['likes'] = information.likes
        vote_count['dislikes'] = information.dislikes

        return Response(vote_count)


class GenreViewList(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_class = (permissions.AllowAny)


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
