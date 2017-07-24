from django.db.models import Q
from django.http import HttpResponseRedirect
from game.models import Game, Package, Platform
from django.shortcuts import get_object_or_404
from game.serializers import (
    GameSerializer, PackageSerializer, PlatformSerializer
)
from game.utils.issue_handler import IssueHandler
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import (
    detail_route, api_view, permission_classes
)
from rest_framework.permissions import AllowAny
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from rest_framework.response import Response

PAGINATOR_RANGE = 5


class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    ordering_fields = ('visualization', 'name', 'downloads_count')

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

        title = form_data['title']
        description = form_data['description']
        official_repository = game.official_repository

        issue_handler = IssueHandler()
        issue_handler.submit_issue(title, description,
                                   official_repository)

        return HttpResponseRedirect('/')

    @detail_route(methods=["GET"])
    def platforms(self, request, pk=None):

        platforms = Platform.objects.filter(
            platforms__game_id=pk
        ).values_list('kernel').distinct()

        groups = {}

        # Platform is a tuple of values by value_list (kernel, )

        for key in platforms:
            key = key[0]
            pac = Package.objects.filter(game_id=pk, platforms__kernel=key)
            groups[key] = PackageSerializer(list(set(pac)), many=True).data

            for package in groups[key]:
                package['platforms'] = ' / '.join(
                    [plat.get('name') for plat in package['platforms']]
                )
        return Response(groups)

    def get_queryset(self):
        queryset = Game.objects.filter(game_activated=True)
        ordering = self.request.query_params.get('ordering', '?')
        self.ordering_fields += tuple(['-' + x for x in self.ordering_fields])
        if ordering in self.ordering_fields:
            queryset = queryset.extra(select={
                'downloads_count': Game.PACKAGE_SUM_QUERY
            }).order_by(ordering)
        else:
            queryset = queryset.order_by(ordering)

        self.queryset = queryset
        return queryset

    @detail_route(methods=["GET"])
    def games_list(self, request, pk=None):
        platforms = request.query_params['platforms'].split()
        genres = request.query_params['genres']
        if genres == "":
            genres = genres.split()
        else:
            genres = genres.split(genres, 0)
        print(genres)
        sort_by = request.query_params['sort']
        try:
            page = int(request.query_params['page'])
            per_page = int(request.query_params['perPage'])
        except ValueError:
            page = 1
            per_page = 16

        games = self._filter(platforms, genres, sort_by)
        games = self.paginate(page, per_page, games)
        return Response(games)

    def paginate(self, page, per_page, data):
        list_games = data
        paginator = Paginator(list_games, per_page)

        try:
            games = paginator.page(page)
        except PageNotAnInteger:
            games = paginator.page(1)
        except EmptyPage:
            games = paginator.page(1)
            page = 1

        interval_range = self.get_pagination_range(page, paginator.num_pages)

        list_games = GameSerializer(games.object_list, many=True).data
        paginated = {
            "games": list_games,
            "info": {
                "range_start": interval_range[0],
                "range_end": interval_range[1],
                "num_pages": paginator.num_pages,
                "page": page
            }
        }
        return paginated

    def get_pagination_range(self, page, num_pages):
        shift = PAGINATOR_RANGE // 2
        range_start = page - shift
        range_end = page + shift

        if range_start < 1:
            range_end += 1 - range_start
            range_start = 1
        elif range_end > num_pages:
            range_start -= range_end - num_pages
            range_end = num_pages

        if range_end > num_pages:
            range_end = num_pages

        if range_start < 1:
            range_start = 1

        return (range_start, range_end)

    def _filter(self, platforms, genres, sort_by):
        ffilter = self._mount_filter("packages__platforms__name", platforms)
        ffilter &= self._mount_filter("information__genres__name", genres)

        data = Game.objects.filter(ffilter)
        data = self._order_by(data, sort_by)
        return data

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


class PackageViewList(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_class = (AllowAny)

    @detail_route(methods=["GET"])
    def game(self, request, pk=None):
        id_game = request.query_params['id_game']
        game = Game.objects.get(id=id_game)
        packages = game.packages.all()
        serializer_package = PackageSerializer(packages, many=True).data

        return Response(serializer_package)


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
