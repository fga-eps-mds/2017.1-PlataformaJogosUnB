import pytest
from game.serializers import GameSerializer
from game.models import Game
from game.views import GameViewSet
from game.factory import GameFactory


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
