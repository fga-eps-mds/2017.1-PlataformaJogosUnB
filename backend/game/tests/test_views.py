from django.utils.translation import ugettext_lazy as _
import pytest
from game.serializers import (
    GameSerializer, PlatformSerializer, PackageSerializer
)
from game.factory import GameFactory, PlatformFactory, PackageFactory
from game.models import Game, Package, Platform
from information.models import Information
import json
import base64
import os
from core.settings import MEDIA_ROOT
from django.db.models import Q
from game.views import GameViewSet


@pytest.fixture
def game():
    GameFactory(game_activated=False)
    return GameFactory()


@pytest.fixture
def platform():
    return PlatformFactory()


@pytest.fixture
def platforms_list():
    return PlatformFactory.create_batch(2)


@pytest.fixture
def list_games(num_games=2):
    return GameFactory.create_batch(num_games)


@pytest.fixture
def batch_games_packages(platform):
    return [pack.game for pack in PackageFactory.create_batch(6)]


class TestGameViewSet:

    @pytest.mark.django_db
    def test_game_list_content(self, client):
        GameFactory.create_batch(3)
        GameFactory(game_activated=False)

        gameList = Game.objects.exclude(game_activated=False)
        response = client.get('/api/games/')

        assert gameList.count() == len(response.data)

    @pytest.mark.django_db
    def test_game_list_json(self, client, game):
        response = client.get("/api/games.json")
        assert response.status_code == 200
        assert response.get("Content-Type") == 'application/json'
        serializer = GameSerializer(game)
        data = serializer.data
        data['slide_image'] = 'http://testserver' + data['slide_image']
        data['cover_image'] = 'http://testserver' + data['cover_image']
        data['card_image'] = 'http://testserver' + data['card_image']
        ordered = response.data[0]
        data_dir = [(x, ordered.get(x)) for x in ordered.keys()]
        assert dict(data_dir) == data

    @pytest.mark.django_db
    def test_game_detail_json(self, client, game):
        response = client.get("/api/games/{}/".format(game.pk))
        assert response.status_code == 200
        assert response.get("Content-Type") == 'application/json'
        data = GameSerializer(game).data
        data['cover_image'] = 'http://testserver' + data['cover_image']
        data['slide_image'] = 'http://testserver' + data['slide_image']
        data['card_image'] = 'http://testserver' + data['card_image']
        assert response.data == data

    @pytest.mark.django_db
    def test_order_by(self, list_games):
        data = Game.objects.all()
        games = GameViewSet()._order_by(data, '')
        assert list(games) == list_games
        games = GameViewSet()._order_by(data, 'name')
        list_games.sort(key=lambda game: game.name)
        assert list(games) == list_games

    @pytest.mark.django_db
    def test_paginate(self, list_games):
        list_serializer = GameSerializer(list_games, many=True).data
        per_page = 2
        page = 1
        games_page = GameViewSet().paginate(page, per_page, list_games)
        assert games_page['games'] == list_serializer
        assert games_page['info']['page'] == page

    def test_get_pagination_range(self):
        page = 3
        num_pages = 10
        range_pages = GameViewSet().get_pagination_range(page, num_pages)
        assert range_pages == (1, 5)
        page = 4
        range_pages = GameViewSet().get_pagination_range(page, num_pages)
        assert range_pages == (2, 6)

    @pytest.mark.django_db
    def test_mount_filter(self, platforms_list):
        ffilter = Q()
        attribute = 'packages__platforms__name'
        for platform in platforms_list:
            ffilter |= Q((attribute, platform.name))
        list_options = (item.name for item in platforms_list)
        ffilter_games = GameViewSet()._mount_filter(attribute, list_options)
        assert ffilter_games.__doc__ == ffilter.__doc__

    @pytest.mark.django_db
    def test_filter(self, list_games):
        games = Game.objects.all()
        games = list(games)
        games.sort(key=lambda game: game.name)
        filtered_games = GameViewSet()._filter('', '', 'name')
        assert list(filtered_games) == games

    @pytest.mark.django_db
    def test_game_visualization(self, client, game):
        client.get("/api/games/{}/".format(game.pk))
        updated_game = Game.objects.get(pk=game.pk)
        assert updated_game.visualization == game.visualization + 1

    @pytest.mark.django_db
    @pytest.mark.parametrize('field, fantasy_field',
                             [('visualization', 'visualization'),
                              ('downloads', 'downloads_count')])
    def test_game_order(self, client, batch_games_packages, field,
                        fantasy_field):
        response = client.get('/api/games/?ordering=-{}'.format(fantasy_field))
        batch_games_packages.sort(key=lambda x: -getattr(x, field))
        game_serial = GameSerializer(batch_games_packages, many=True)
        for x in zip(game_serial.data, response.data):
            x[0]['cover_image'] = 'http://testserver' + x[0]['cover_image']
            x[0]['slide_image'] = 'http://testserver' + x[0]['slide_image']
            x[0]['card_image'] = 'http://testserver' + x[0]['card_image']
            x[0]['packages'][0]['package'] = 'http://testserver' + \
                x[0]['packages'][0]['package']

            assert x[0] == x[1]

    @pytest.mark.django_db
    def test_game_platforms(self, client, game, platform):
        packages = PackageFactory.create_batch(1, game=game)
        response = client.get("/api/games/{}/platforms/".format(game.pk))
        packages = PackageSerializer(packages, many=True).data
        for pack in packages:
            pack['platforms'] = ' / '.join(
                [p.get('name') for p in pack['platforms']])
        assert response.data == {platform.kernel: packages}


class TestViewGamePost:

    @pytest.fixture
    def image_str(self):
        image = GameFactory.build(name=None, official_repository=None
                                  ).cover_image.file
        return base64.b64encode(image.read()).decode('utf-8')

    @pytest.fixture
    def game_serial(self, image_str):
        return {'name': 'quae',
                'official_repository': 'https://www.martinez.com/',
                'game_activated': True,
                'image_name': 'serial',
                'extension': 'jpg',
                'image_data': image_str,
                }

    @pytest.mark.django_db
    def test_save_only_game(self, admin_client, game_serial):
        response = admin_client.post("/api/games/",
                                     data=json.dumps(game_serial),
                                     content_type="application/json",
                                     format="multipart")
        assert 200 <= response.status_code < 300
        assert Game.objects.count() == 1

    def test_invalid_format_extension(self, admin_client, game_serial):
        game_serial['extension'] = 'jpe'
        response = admin_client.post("/api/games/",
                                     data=json.dumps(game_serial),
                                     content_type="application/json",
                                     format="multipart")
        assert response.status_code == 400
        assert response.data == {'non_field_errors': [_('invalid image '
                                                      'extension')]}

    def test_remove_temp_file(self, admin_client, game_serial):
        admin_client.post("/api/games/",
                          data=json.dumps(game_serial),
                          content_type="application/json",
                          format="multipart")

        path = "{}/images/{}.{}".format(MEDIA_ROOT,
                                        game_serial['image_name'],
                                        game_serial['extension'])
        assert not os.path.exists(path)

    @pytest.fixture
    def information_serial(self):
        return {'description': 'game' * 13,
                'launch_year': 2017,
                'semester': 1,
                'game_id': 0,
                }

    @pytest.mark.django_db
    def test_save_with_information(self, admin_client, information_serial,
                                   game_serial):
        game_serial['information'] = information_serial
        response = admin_client.post("/api/games/",
                                     data=json.dumps(game_serial),
                                     content_type="application/json",
                                     format="multipart")
        print(response.data)
        assert 200 <= response.status_code < 300
        last = Information.objects.last()
        assert last is not None


class TestPackageApi:

    @pytest.mark.django_db
    def test_package_save(self, admin_client, game, platform):
        pack = PackageFactory.build().package
        response = admin_client.post('/api/packages/', {
            'package': pack.file,
            'game_id': game.pk,
            'architecture': 'X86/32-bit'
        }, format='multipart')

        assert 200 <= response.status_code < 300
        assert Package.objects.count() == 1
        package = Package.objects.last()
        assert package.game.pk == game.pk


class TestPlatformViewList:

    @pytest.fixture
    def response_list(self, client, platforms_list):
        return client.get('/api/platforms')

    @pytest.mark.django_db
    def test_access_route(self, response_list):
        assert 200 <= response_list.status_code < 300

    @pytest.mark.django_db
    def test_data_platforms(self, response_list):
        platforms = PlatformSerializer(Platform.objects.all(), many=True).data
        assert response_list.data is not None
        assert platforms == response_list.data

    @pytest.mark.django_db
    def test_package_downloads(self, client, game, platform):
        package = PackageFactory(game=game)
        respons = client.post("/api/packages/{}/downloads/".format(package.pk))
        assert 200 <= respons.status_code < 300
        assert respons.data == {'update': _('downloads count increase')}
        downloads = Package.objects.get(pk=package.pk).downloads
        assert downloads == package.downloads + 1
