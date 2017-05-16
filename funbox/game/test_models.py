import pytest
from game.models import Game
from game.factory import PackageFactory, GameFactory
from unittest.mock import patch
from core.helper_test import validation_test


def game_creation(name="", cover_image="", url="",
                  launch_year=0, game_version="1.3.4"):
    return Game(name=name, cover_image=cover_image, official_repository=url,
                game_version=game_version)


@pytest.fixture
def game_created():
    game = Game()
    game.name = 'mario'
    game.cover_image = "imagem_de_capa_mario"
    game.official_repository = 'https://github.com/PlataformaJogosUnb/'
    game.save()
    return game


class TestPackageModel:

    @pytest.mark.django_db
    def test_package(self):
        package = PackageFactory.build(game=GameFactory())
        with patch("game.validators._get_size", return_value=1 + 1024**3):
            validation_test(package,
                            {"package": ["Please keep filesize under 1,0"
                                         "\xa0GB. Current filesize 10\xa0"
                                         "bytes"]
                             })


class TestGame:

    @pytest.mark.django_db
    def test_create_game_with_valid_atributtes(self, game_created):
        game = Game.objects.get(pk=game_created.pk)
        assert game_created == game


class TestGameValidation:
    error_not_allowed_version = ""

    @pytest.mark.django_db
    @pytest.mark.parametrize("game, errors_dict", [
        ("", ""),
    ])
    def test_validations(self, game, errors_dict):
        assert True
