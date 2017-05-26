import pytest
from game.serializers import GameSerializer
from game.models import Game
from game.views import GameViewSet
from game.factory import GameFactory


@pytest.fixture
def create_game():
    game = Game(name="jogo1", cover_image="image_de_capa.jpg",
                official_repository="https://github.com/Plata"
                "formaJogosUnb/")
    game.save()
    return game


class TestGameViewSet:

    @pytest.mark.django_db
    def test_header_game_list(self, client, create_game):
        response = client.get('/games/list/')
        assert response.status_code == 200
        assert response.template_name == 'game/list.html'
        assert response.get('Content-Type') == 'text/html; charset=utf-8'
        assert response.charset == 'utf-8'

    @pytest.mark.django_db
    def test_data_game_list(self, client, create_game):
        response = client.get('/games/list/')
        assert "games" in response.data
        assert len(response.data["games"]) == 1
        assert response.data["games"].first() == create_game

    @pytest.mark.django_db
    def test_game_list_content(self, client, create_game):
        # Create 3 games that's have game_activated = True.
        for i in range(0, 3):
            game = GameFactory()
            game.save()

        # Create one games that's have game_activated = True.
        game = GameFactory(game_activated=False)
        game.save()

        gameList = Game.objects.exclude(game_activated=False)

        # Assert if only activated games are in the queryset list.
        assert gameList.count() == GameViewSet.queryset.count()

    @pytest.mark.django_db
    def test_header_game_detail(self, client, create_game):
        response = client.get("/games/detail/{}/".format(create_game.pk))
        assert response.status_code == 200
        assert response.template_name == 'game/show.html'
        assert response.get("Content-Type") == 'text/html; charset=utf-8'
        assert response.charset == 'utf-8'

    @pytest.mark.django_db
    def test_data_game_detail(self, client, create_game):
        response = client.get("/games/detail/{}/".format(create_game.pk))
        assert "game" in response.data
        assert response.data["game"] == create_game

    @pytest.mark.django_db
    def test_game_list_json(self, client, create_game):
        response = client.get("/games/list.json")
        assert response.status_code == 200
        assert response.get("Content-Type") == 'application/json'
        serializer = GameSerializer(Game.objects.all(), many=True)
        assert response.data == serializer.data

    @pytest.mark.django_db
    def test_game_detail_json(self, client, create_game):
        response = client.get("/games/detail/{}.json".format(create_game.pk))
        assert response.status_code == 200
        assert response.get("Content-Type") == 'application/json'
        serializer = GameSerializer(create_game)
        assert response.data == serializer.data
