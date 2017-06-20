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
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage


PAGINATOR_RANGE = 5


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.exclude(game_activated=False)
    serializer_class = GameSerializer
    filtered_games = []

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
    def games_list(self, request, pk=None):
        platforms = request.query_params['platforms'].split()
        genres = request.query_params['genres'].split()
        sort_by = request.query_params['sort']
        try:
            page = int(request.query_params['page'])
            per_page = int(request.query_params['perPage'])
        except ValueError:
            page = 1
            per_page = 16

        self._filter(platforms, genres, sort_by)
        return Response(self.paginate(page, per_page))

    def paginate(self, page, per_page):
        list_games = self.filtered_games
        paginator = Paginator(list_games, per_page)

        try:
            games = paginator.page(page)
        except PageNotAnInteger:
            games = paginator.page(1)
        except EmptyPage:
            games = paginator.page(1)
            page = 1

        interval_range = self.get_pagination_range(page, paginator)

        list_games = GameSerializer(games.object_list, many=True).data
        paginated = {
            "games": list_games,
            "info":{
                "range_start": interval_range[0],
                "range_end": interval_range[1],
                "num_pages": paginator.num_pages,
                "page": page
            }
        }
        return paginated

    def get_pagination_range(self, page, paginator):
        shift = PAGINATOR_RANGE // 2
        range_start = page - shift
        range_end = page + shift

        if range_start < 1:
            range_end += 1 - range_start
            range_start = 1
        elif range_end > paginator.num_pages:
            range_start -= range_end - paginator.num_pages
            range_end = paginator.num_pages

        if range_end > paginator.num_pages:
            range_end = paginator.num_pages

        if range_start < 1:
            range_start = 1

        return (range_start, range_end)
        
    def _filter(self, platforms, genres, sort_by):
        ffilter = self._mount_filter("packages__platforms__name", platforms)
        ffilter &= self._mount_filter("information__genres__name", genres)

        data = Game.objects.filter(ffilter)
        data = self._order_by(data, sort_by)
        self.filtered_games = data

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
