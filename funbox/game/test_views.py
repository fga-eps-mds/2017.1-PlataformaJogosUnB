import pytest
from game.models import Game


class TestRoute:

    @pytest.fixture
    def create_game(self):
        game = Game(name="jogo1",official_repository="https://github.com/PlataformaJogosUnb/")
        game.save()
        return game

    @pytest.mark.django_db
    def test_header_game_list(self, client, create_game):
        response = client.get('/games/game-list/')
        assert response.status_code == 200
        assert response.template_name == 'game/list.html'
        assert response.get('Content-Type') == 'text/html; charset=utf-8'
        assert response.charset == 'utf-8'
        
