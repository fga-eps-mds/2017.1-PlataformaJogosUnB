import pytest
from game.models import Game
from information.models import Information

@pytest.fixture
def game_created():
    information = Information()
    information.description = 'bla'
    information.launch_year = 2017
    information.save()

    g = Game()
    g.name = 'mario'
    g.description = 'aiushda'
    g.information = information
    g.save()
    return g


class TestBasicdb:

    @pytest.mark.django_db
    def test_my_first(self,game_created):
        game = Game.objects.get(pk=1)
        assert game_created == game

@pytest.mark.django_db
def test_game():
    Information(description='feef', launch_year=2017).save()
    game = Game(name="HELLO",
                game_version="1.0",
                information_id=1)
    game.save()
    game_from_db=Game.objects.get(pk=1)
    assert game == game_from_db

