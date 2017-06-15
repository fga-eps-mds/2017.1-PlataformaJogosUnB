import pytest
from game.serializers import GameSerializer, PlatformSerializer
from game.factory import GameFactory, PlatformFactory, PackageFactory
from game.models import Game, Package, Platform
from information.models import Information
import json
import base64
import os
from core.settings import MEDIA_ROOT


from game.views import GameViewSet


@pytest.fixture
def game():
    GameFactory(game_activated=False)
    return GameFactory()


@pytest.fixture
def platform():
    return PlatformFactory()


class TestGameViewSet:

    @pytest.mark.django_db
    def test_game_list_content(self, client):
        GameFactory.create_batch(3)
        GameFactory(game_activated=False)

        gameList = Game.objects.exclude(game_activated=False)

        assert gameList.count() == GameViewSet.queryset.count()

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
        response = client.get("/api/games/{}.json".format(game.pk))
        assert response.status_code == 200
        assert response.get("Content-Type") == 'application/json'
        data = GameSerializer(game).data
        data['cover_image'] = 'http://testserver' + data['cover_image']
        data['slide_image'] = 'http://testserver' + data['slide_image']
        data['card_image'] = 'http://testserver' + data['card_image']
        assert response.data == data


class TestViewGamePost:

    @pytest.fixture
    def image_str(self):
        image = GameFactory.build(name=None, official_repository=None,
                                  version=None).cover_image.file
        return base64.b64encode(image.read()).decode('utf-8')

    @pytest.fixture
    def game_serial(self, image_str):
        return {'name': 'quae',
                'version': '1.0',
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
        assert response.data == {'non_field_errors': ['invalid image '
                                                      'extension']}

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
        assert 200 <= response.status_code < 300
        last = Information.objects.last()
        assert last is not None


class TestPackageApiSave:

    @pytest.mark.django_db
    def test_package_save(self, admin_client, game, platform):
        pack = PackageFactory.build().package
        response = admin_client.post('/api/packages/', {
            'package': pack.file,
            'game_id': game.pk
        }, format='multipart')

        assert 200 <= response.status_code < 300
        assert Package.objects.count() == 1
        package = Package.objects.last()
        assert package.game.pk == game.pk


class TestPlatformViewList:

    @pytest.fixture
    def platforms_list(self):
        return PlatformFactory.create_batch(2)

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
        base = "http://testserver"
        for platform in platforms:
            platform['icon'] = base + platform['icon']
        assert platforms == response_list.data
