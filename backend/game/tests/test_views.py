import pytest
from game.serializers import GameSerializer
from game.factory import GameFactory
from game.models import Game
import json
import base64


from game.views import GameViewSet


@pytest.fixture
def create_game():
    GameFactory(game_activated=False)
    return GameFactory()


class TestGameViewSet:

    @pytest.mark.django_db
    def test_game_list_content(self, client):
        GameFactory.create_batch(3)
        GameFactory(game_activated=False)

        gameList = Game.objects.exclude(game_activated=False)

        assert gameList.count() == GameViewSet.queryset.count()

    @pytest.mark.django_db
    def test_game_list_json(self, client, create_game):
        response = client.get("/api/games.json")
        assert response.status_code == 200
        assert response.get("Content-Type") == 'application/json'
        serializer = GameSerializer(create_game)
        data = serializer.data
        data['slide_image'] = 'http://testserver' + data['slide_image']
        data['cover_image'] = 'http://testserver' + data['cover_image']
        data['card_image'] = 'http://testserver' + data['card_image']
        ordered = response.data[0]
        data_dir = [(x, ordered.get(x)) for x in ordered.keys()]
        assert dict(data_dir) == data

    @pytest.mark.django_db
    def test_game_detail_json(self, client, create_game):
        response = client.get("/api/games/{}.json".format(create_game.pk))
        assert response.status_code == 200
        assert response.get("Content-Type") == 'application/json'
        data = GameSerializer(create_game).data
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
                'image_name': 'example',
                'extension': 'jpg',
                'image_data': image_str,
                }

    @pytest.mark.django_db
    def test_save_only_game(self, admin_client, game_serial):
        response = admin_client.post("/api/games/",
                                     data=json.dumps(game_serial),
                                     content_type="application/json",
                                     format="multipart")
        print(response.data)
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

    @pytest.mark.django_db
    def test_save_with_information(self, admin_client):
        assert True
