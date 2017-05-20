from core.helper_test import (
    validation_test,
    mount_error_dict,
    ErrorMessage
)
from media.models import (
    Image,
    Soundtrack,
    Video
)
from game.models import Game
import pytest


@pytest.fixture
def game_created():
    game = Game()
    game.name = 'mario'
    game.cover_image = "image.jpg"
    game.official_repository = 'https://github.com/PlataformaJogosUnb/'
    game.save()
    return game


class TestMedia:

    @pytest.mark.django_db
    @pytest.mark.parametrize('image, errors_dict', [
        ('image.ppm',
         mount_error_dict(['image'], [[ErrorMessage.IMAGE_EXTENSION]])),
        ('image.py',
         mount_error_dict(['image'], [[ErrorMessage.NOT_IMAGE.value[0],
                                      ErrorMessage.NOT_IMAGE.value[1]]])),
    ])
    def test_image_invalid_extension(self, image, errors_dict, game_created):
        image = Image(image=image, game=game_created)

    @pytest.mark.django_db
    def test_image_valid_extension(self, game_created):
        image = Image(
            image='image.jpg',
            game=game_created
        )
        image.save()
        assert Image.objects.last() == image

    @pytest.mark.django_db
    def test_soundtrack_invalid_extension(self, game_created):
        soundtrack = Soundtrack(
            soundtrack='soundtrack.mp4',
            game=game_created
        )
        validation_test(
            soundtrack,
            mount_error_dict(
                ['soundtrack'],
                [[ErrorMessage.SOUNDTRACK_EXTENSION]]
            )
        )

    @pytest.mark.django_db
    def test_soundtrack_valid_extension(self, game_created):
        soundtrack = Soundtrack(
            soundtrack='soundtrack.mp3',
            game=game_created
        )
        soundtrack.save()
        assert Soundtrack.objects.last() == soundtrack

    @pytest.mark.django_db
    def test_video_invalid_extension(self, game_created):
        video = Video(
            video='video.jpg',
            game=game_created
        )
        validation_test(
            video,
            mount_error_dict(
                ['video'],
                [[ErrorMessage.VIDEO_EXTENSION]]
            )
        )

    @pytest.mark.django_db
    def test_video_valid_extension(self, game_created):
        video = Video(
            video='video.mp4',
            game=game_created
        )
        video.save()
        assert Video.objects.last() == video
