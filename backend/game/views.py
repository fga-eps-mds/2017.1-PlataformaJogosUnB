from django.db.models import Q
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from game.models import Game, Package, Platform
from game.serializers import (
    GameSerializer, PackageSerializer, PlatformSerializer
)
from game.utils.issue_handler import IssueHandler
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import (
    detail_route, api_view, permission_classes
)
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.exclude(game_activated=False)
    serializer_class = GameSerializer
    filter_backends = (OrderingFilter,)
    ordering_fields = ('visualization', 'name')
    ordering = ('name')

    def retrieve(self, request, pk=None, *args, **kwargs):
        response = super().retrieve(request, pk, *args, **kwargs)
        game = self.queryset.last()
        game.visualization += 1
        game.save()
        return response

    @detail_route(methods=["POST"])
    def report_bug(self, request, pk=None):
        game = get_object_or_404(self.queryset, pk=pk)
        form_data = request.data

        if request.method == 'POST':
            title = form_data['title']
            description = form_data['description']
            official_repository = game.official_repository

            issue_handler = IssueHandler()
            issue_handler.submit_issue(title, description,
                                       official_repository)

            return HttpResponseRedirect('/')

    @detail_route(methods=["GET"])
    def filter(self, request, pk=None):
        platforms = request.query_params['platforms'].split()
        genres = request.query_params['genres'].split()
        ffilter = self.__mount_filter__("packages__platforms__name", platforms)
        ffilter &= self.__mount_filter__("information__genres__name", genres)
        data = Game.objects.filter(ffilter)
        return Response(GameSerializer(data, many=True).data)

    def __mount_filter__(self, name, itens):
        filter_data = Q()
        for item in itens:
            filter_data |= Q((name, item))
        return filter_data


class PackageCreateView(generics.CreateAPIView, generics.UpdateAPIView):
    serializer_class = PackageSerializer


class PlatformViewList(generics.ListAPIView):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    permission_class = (AllowAny)


@api_view(["POST"])
@permission_classes((AllowAny, ))
def downloads(request, pk=None):
    package = get_object_or_404(Package, pk=pk)
    package.downloads += 1
    package.save()
    return Response({'update': 'downloads count increase'})
