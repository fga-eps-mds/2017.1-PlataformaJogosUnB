import pytest
from game.factory import PackageFactory, GameFactory, PlatformFactory
from game.serializers import GameSerializer
from information.factory import (
    AwardFactory, CreditFactory, InformationFactory
)
from media.factory import ImageFactory, VideoFactory, SoundtrackFactory


class TestGameSerializer:

    @pytest.fixture
    def game(self):
        credit = CreditFactory()
        award_game = AwardFactory()

        game = GameFactory()
        InformationFactory(
            game=game, awards=[award_game], credits=[credit]
        )

        ImageFactory(game=game)
        PlatformFactory()
        PackageFactory(game=game)

        VideoFactory(game=game)
        SoundtrackFactory(game=game)

        return game

    @pytest.mark.django_db
    def test_serialization_game_object(self, game):
        serialized_game = GameSerializer(game).data
        game = {'name': game.name,
                'cover_image': game.cover_image.url,
                'official_repository': game.official_repository,
                'version': game.version,
                'slide_image': game.slide_image.url,
                'card_image': game.card_image.url,
                'visualization': game.visualization,
                'game_activated': game.game_activated,
                'pk': game.pk,
                'downloads': game.downloads
                }
        serialized_game.pop('information')
        serialized_game.pop('media_image')
        serialized_game.pop('media_soundtrack')
        serialized_game.pop('media_video')
        serialized_game.pop('packages')
        assert game == dict(serialized_game)

    @pytest.mark.django_db
    def test_serialization_medias_object(self, game):
        serialized_game = GameSerializer(game).data
        image_serialized = serialized_game.get('media_image')[0]
        video_serialized = serialized_game.get('media_video')[0]
        sound_serialized = serialized_game.get('media_soundtrack')[0]

        assert image_serialized.get(
            'image') == game.media_image.first().image.url

        assert video_serialized.get(
            'video') == game.media_video.first().video.url

        assert sound_serialized.get(
            'soundtrack') == game.media_soundtrack.first().soundtrack.url

    @pytest.mark.django_db
    def test_serialization_information_object(self, game):
        serialized_game = GameSerializer(game).data
        information_serialized = serialized_game.get('information')
        credit_serialized = information_serialized.get('credits')[0]
        award_serialized = information_serialized.get('awards')[0]

        assert information_serialized.get(
            'description') == game.information.description

        assert information_serialized.get(
            'launch_year') == game.information.launch_year

        assert credit_serialized == {
            'github_page': game.information.credits.first().github_page,
            'email': game.information.credits.first().email,
            'name': game.information.credits.first().name,
            'specialty': game.information.credits.first().specialty,
        }

        assert award_serialized == {
            'name': game.information.awards.first().name,
            'year': game.information.awards.first().year,
            'place': game.information.awards.first().place,
        }

    @pytest.mark.django_db
    def test_serialization_extra_object(self, game):
        serialized_game = GameSerializer(game).data
        package_serialized = serialized_game.get('packages')[0]
        platform_serialized = package_serialized.get('platforms')[0]

        assert package_serialized.get(
            'package') == game.packages.first().package.url

        assert platform_serialized.get(
            'name') == game.packages.first().platforms.first().name

        assert platform_serialized.get(
            'extensions') == game.packages.first().platforms.first().extensions

        assert platform_serialized.get(
            'icon') == game.packages.first().platforms.first().icon.url
