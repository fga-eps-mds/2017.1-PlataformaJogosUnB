from game.models import Game, Platform
from game.serializers import (
    GameSerializer,
    PackageSerializer,
)
from game.serializers import PlatformSerializer
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from rest_framework.permissions import AllowAny
from game.utils.issue_handler import IssueHandler
from django.http import HttpResponseRedirect
from django.db.models import Q


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.exclude(game_activated=False)
    serializer_class = GameSerializer

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
        sort_by = request.query_params['sort']
        ffilter = self._mount_filter("packages__platforms__name", platforms)
        ffilter &= self._mount_filter("information__genres__name", genres)
        data = Game.objects.filter(ffilter)
        data = self._order_by(data, sort_by)
        return Response(GameSerializer(data, many=True).data)

    def _mount_filter(self, name, itens):
        filter_data = Q()
        for item in itens:
            filter_data |= Q((name, item))
        return filter_data

    def _order_by(self, object_list, option):
        if option != '':
            return object_list.order_by(option)
        return object_list.order_by()


class PackageCreateView(generics.CreateAPIView, generics.UpdateAPIView):
    serializer_class = PackageSerializer


class PlatformViewList(generics.ListAPIView):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    permission_class = (AllowAny)
