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
import pytest
from media.factory import ImageFactory, SoundtrackFactory, VideoFactory
from game.factory import GameFactory


@pytest.fixture
def game_created():
    game = GameFactory()
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
        image = ImageFactory.build(image=image, game=game_created)

    @pytest.mark.django_db
    def test_image_valid_extension(self, game_created):
        image = ImageFactory.build(game=game_created)
        image.save()
        assert Image.objects.last() == image

    @pytest.mark.django_db
    def test_soundtrack_invalid_extension(self, game_created):
        soundtrack = SoundtrackFactory.build(soundtrack='soundtrack.mp4',
                                             game=game_created)
        validation_test(
            soundtrack,
            mount_error_dict(
                ['soundtrack'],
                [[ErrorMessage.SOUNDTRACK_EXTENSION]]
            )
        )

    @pytest.mark.django_db
    def test_soundtrack_valid_extension(self, game_created):
        soundtrack = SoundtrackFactory.build(game=game_created)
        soundtrack.save()
        assert Soundtrack.objects.last() == soundtrack

    @pytest.mark.django_db
    def test_video_invalid_extension(self, game_created):
        video = VideoFactory.build(video='video.jpg', game=game_created)
        validation_test(
            video,
            mount_error_dict(
                ['video'],
                [[ErrorMessage.VIDEO_EXTENSION]]
            )
        )

    @pytest.mark.django_db
    def test_video_valid_extension(self, game_created):
        video = VideoFactory.build(game=game_created)
        video.save()
        assert Video.objects.last() == video
