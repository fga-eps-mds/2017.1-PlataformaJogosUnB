import pytest
from game.models import Game


@pytest.fixture
def create_game():
    game = Game(name="jogo1",official_repository="https://github.com/PlataformaJogosUnb/")
    game.save()
    return game


class TestGameList:


    @pytest.mark.django_db
    def test_header_game_list(self, client, create_game):
        response = client.get('/games/game-list/')
        assert response.status_code == 200
        assert response.template_name == 'game/list.html'
        assert response.get('Content-Type') == 'text/html; charset=utf-8'
        assert response.charset == 'utf-8'
   
    @pytest.mark.django_db
    def test_data_game_list(self, client, create_game):
        response = client.get('/games/game-list/')
        assert "games" in response.data
        assert len(response.data["games"]) == 1
        assert response.data["games"].first() == create_game
    
class TestGameDetail:

    
    @pytest.mark.django_db
    def test_header_game_detail(self, client, create_game):
        response = client.get("/games/game-detail/1/");
        print (dir(response))
        assert response.status_code == 200
        """assert response.template_name == 'game/show.html'"""
        assert response.get("Content-Type") == 'text/html; charset=utf-8'
        assert response.charset == 'utf-8'
