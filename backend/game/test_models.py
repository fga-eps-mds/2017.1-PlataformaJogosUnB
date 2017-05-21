from django.core.exceptions import ValidationError
from game.models import Game, Platform, Package
from core.validators import PACKAGE_EXTENSION_ERROR
from core.helper_test import (
    validation_test,
    mount_error_dict,
    ErrorMessage
)
import pytest
from game.factory import PackageFactory, GameFactory, PlatformFactory
from unittest.mock import patch


def game_creation(name="", cover_image="", url="",
                  launch_year=0, version="1.3.4"):
        return Game(
            name=name,
            cover_image=cover_image,
            official_repository=url,
            game_activated=True,
            version=version
        )


@pytest.fixture
def game_created():
    game = Game()
    game.name = 'mario'
    game.cover_image = "image.jpg"
    game.official_repository = 'https://github.com/PlataformaJogosUnb/'
    game.game_activated = True
    game.save()
    return game


@pytest.fixture
def platform_created():
    platform = Platform()
    platform.name = 'Ubuntu'
    platform.extensions = 'deb'
    platform.icon = "icon.png"
    platform.save()
    return platform


class TestPackageModel:

    @pytest.mark.django_db
    def test_package(self):
        PlatformFactory()
        package = PackageFactory.build(game=GameFactory())
        with patch("game.validators._get_size", return_value=1 + 1024**3):
            validation_test(package,
                            {"package": ["Please keep filesize under 1,0"
                                         "\xa0GB. Current filesize 10\xa0"
                                         "bytes"]
                             })


class TestGame:

    @pytest.mark.django_db
    @pytest.mark.parametrize(('name, cover_image, version, ' +
                              'official_repository, errors_dict'), [
        ('game_name', 'test_image.ppm', '1.0', 'http://a.com',
         mount_error_dict(['cover_image'], [[ErrorMessage.IMAGE_EXTENSION]])),
        ('game_name', 'test_image.py', '1.0', 'http://a.com',
         mount_error_dict(['cover_image'],
                          [[ErrorMessage.NOT_IMAGE.value[0],
                            ErrorMessage.NOT_IMAGE.value[1]]])),
    ])
    def test_cover_image_extension(self, name, cover_image, version,
                                   official_repository, errors_dict):
        game = Game(name=name, cover_image=cover_image, version=version,
                    official_repository=official_repository)
        validation_test(game, errors_dict)

    @pytest.mark.django_db
    def test_create_game_with_valid_atributtes(self, game_created):
        game = Game.objects.get(pk=game_created.pk)
        assert game_created == game


class TestPlatform:

    @pytest.mark.django_db
    @pytest.mark.parametrize('name, icon, extensions, errors_dict', [
        ('platform_name', 'test_image.ppm', 'deb',
         mount_error_dict(['icon'], [[ErrorMessage.IMAGE_EXTENSION]])),
        ('platform_name', 'test_image.py', 'deb',
         mount_error_dict(['icon'], [[ErrorMessage.NOT_IMAGE.value[0],
                                      ErrorMessage.NOT_IMAGE.value[1]]])),
    ])
    def test_icon_extension(self, name, icon, extensions, errors_dict):
        platform = Platform(name=name, icon=icon, extensions=extensions)
        validation_test(platform, errors_dict)


class TestPackage:
    '''
    Only package extensions which have platforms that
    can play it are allowed
    '''
    @pytest.mark.django_db
    @pytest.mark.parametrize('package_file, message', [
        ('package.py', PACKAGE_EXTENSION_ERROR),
        ('package.deb', PACKAGE_EXTENSION_ERROR),
        ('package.exe', PACKAGE_EXTENSION_ERROR)
    ])
    def test_invalid_package_extensions(self, package_file,
                                        game_created, message):

        package = Package(package=package_file, game=game_created)
        with pytest.raises(ValidationError) as validation_error:
            package.save()

        assert validation_error.value.message == message

    @pytest.mark.django_db
    @pytest.mark.parametrize(('extension'), [
        ('deb'),
        ('exe'),
    ])
    def test_valid_package_extensions(self, extension):
        PlatformFactory(extensions=extension)

        package = PackageFactory.build(game=GameFactory())
        package.package.name = package.package.name.replace('deb', extension)
        package.save()
        assert package == Package.objects.last()
