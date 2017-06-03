import pytest
from game.factory import PackageFactory, GameFactory
from game.models import Platform  # Package
from game.serializers import GameSerializer
from information.models import Award, Developer, Information
from media.models import Video, Soundtrack
from media.factory import ImageFactory
from game.choices import EXTENSION_CHOICES
from media.choices import ROLE_CHOICES


class TestGameSerializer:

    @pytest.fixture
    def game(self):
        platform = Platform()
        video_game = Video()
        sound_game = Soundtrack()
        award_game = Award()
        developer = Developer()
        information_game = Information()

        game = GameFactory()
        ImageFactory(game=game)
        package_game = PackageFactory.build(game=game)

        platform.name = 'Ubuntu'
        platform.extensions = EXTENSION_CHOICES[0][0]
        platform.icon = 'Platform/linux.png'
        platform.save()

        package_game.save()
        package_game.platforms.add(platform)

        video_game.video = 'videos/exemplo.mp4'
        video_game.role = ROLE_CHOICES[0][0]
        video_game.game_id = game.id
        video_game.save()

        sound_game.soundtrack = 'soundtrack/exemplo.mp3'
        sound_game.role = ROLE_CHOICES[0][0]
        sound_game.game_id = game.id
        sound_game.save()

        award_game.name = 'Game of the year'
        award_game.year = 2014
        award_game.place = 'Conference game'
        award_game.save()

        developer.name = 'Developer 1'
        developer.login = 'developer_1'
        developer.github_page = 'https://github.com/PlataformaJogosUnb/'
        developer.save()

        information_game.description = 'This is a test game used to test the\
        serializer of the model game.'
        information_game.launch_year = 2013
        information_game.semester = 1
        information_game.game = game
        information_game.save()
        information_game.developers.add(developer)
        information_game.awards.add(award_game)
        return game

    @pytest.mark.django_db
    def test_serialization_game_object(self, game):
        serialized_game = GameSerializer(game).data

        assert serialized_game.get('name') == game.name

        assert serialized_game.get('cover_image') == game.cover_image.url

        assert serialized_game.get(
            'official_repository') == game.official_repository

        assert serialized_game.get('version') == game.version

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
        developer_serialized = information_serialized.get('developers')[0]
        award_serialized = information_serialized.get('awards')[0]

        assert information_serialized.get(
            'description') == game.information.description

        assert information_serialized.get(
            'launch_year') == game.information.launch_year

        assert developer_serialized == {
            'login': game.information.developers.first().login,
            'github_page': game.information.developers.first().github_page,
            'email': None,
            'avatar': None,
            'name': game.information.developers.first().name
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
