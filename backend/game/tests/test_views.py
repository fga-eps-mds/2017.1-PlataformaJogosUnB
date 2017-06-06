import pytest
import json
from core.factory import UserFactory
from game.serializers import GameSerializer
from game.factory import GameFactory
from game.models import Game


"""
from game.models import Game
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

"""


class TestViewGamePost:

    @pytest.fixture
    def client_loggin(self, client):
        user = UserFactory()
        client.login(username=user.username, password='qwer1234')
        return client

    @pytest.mark.django_db
    def test_save_only_game(self, client_loggin):
        game = GameSerializer(GameFactory.build()).data
        response = client_loggin.post("/api/games/",
                                      data=json.dumps(game),
                                      content_type='application/json')
        print(response.content)
        print(response.data)
        assert 200 <= response.status_code < 300
        assert Game.objects.count() == 1
