import pytest
from game.factory import GameFactory
from media.models import (
    Image,
    Video,
    Soundtrack
)
from media.factory import (
    ImageFactory,
    VideoFactory,
    SoundtrackFactory
)


@pytest.fixture
def game():
    return GameFactory()


class TestImageApiSave:

    @pytest.mark.django_db
    def test_image_save(self, admin_client, game):
        image = ImageFactory.build().image
        response = admin_client.post('/api/images/', {
            'image': image.file,
            'game_id': game.pk
        }, format='multipart')

        assert 200 <= response.status_code < 300
        assert Image.objects.count() == 1
        image = Image.objects.last()
        assert image.game.pk == game.pk


class TestVideoApiSave:

    @pytest.mark.django_db
    def test_video_save(self, admin_client, game):
        video = VideoFactory.build().video
        response = admin_client.post('/api/videos/', {
            'video': video.file,
            'game_id': game.pk
        }, format='multipart')

        print(response.request)

        assert 200 <= response.status_code < 300
        assert Video.objects.count() == 1
        video = Video.objects.last()
        assert video.game.pk == game.pk


class TestSoundtrackApiSave:

    @pytest.mark.django_db
    def test_soundtrack_save(self, admin_client, game):
        soundtrack = SoundtrackFactory.build().soundtrack
        response = admin_client.post('/api/soundtracks/', {
            'soundtrack': soundtrack.file,
            'game_id': game.pk
        }, format='multipart')

        assert 200 <= response.status_code < 300
        assert Soundtrack.objects.count() == 1
        soundtrack = Soundtrack.objects.last()
        assert soundtrack.game.pk == game.pk
