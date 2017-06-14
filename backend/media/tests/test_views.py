import pytest
from game.factory import GameFactory
from media.factory import (
    ImageFactory,
    VideoFactory,
    SoundtrackFactory
)


@pytest.fixture
def game():
    return GameFactory()


class TestMediaApiSave:

    @pytest.mark.django_db
    @pytest.mark.parametrize("factory, route", [
        (ImageFactory, "images/"),
        (VideoFactory, "videos/"),
        (SoundtrackFactory, "soundtracks/")
    ])
    def test_image_save(self, factory, route, admin_client, game):
        object_model = factory.build()
        attr = type(object_model).__name__.lower()
        media = getattr(object_model, attr)

        response = admin_client.post('/api/' + route, {
            attr: media.file,
            'game_id': game.pk
        }, format='multipart')

        assert 200 <= response.status_code < 300
        assert object_model.__class__.objects.count() == 1
        media = object_model.__class__.objects.last()
        assert media.game.pk == game.pk
