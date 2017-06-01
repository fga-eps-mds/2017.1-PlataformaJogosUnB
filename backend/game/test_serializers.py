import pytest
from game.factory import PackageFactory, GameFactory
from game.models import Game, Platform  # Package
from game.serializers import GameSerializer
from information.models import Award, Developer, Information
from media.models import Image, Video, Soundtrack
from game.choices import EXTENSION_CHOICES
from media.choices import ROLE_CHOICES


class TestGameSerializer:

    @pytest.fixture
    def data(self):
        platform = Platform()
        image_game = Image()
        video_game = Video()
        sound_game = Soundtrack()
        award_game = Award()
        developer = Developer()
        information_game = Information()

        game = GameFactory()
        package_game = PackageFactory.build(game=game)

        platform.name = 'Ubuntu'
        platform.extensions = EXTENSION_CHOICES[0][0]
        platform.icon = 'Platform/linux.png'
        platform.save()

        image_game.image = 'images/exemplo.jpeg'
        image_game.role = ROLE_CHOICES[0][0]
        image_game.game_id = game.id
        image_game.save()

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
        information_game.game = game
        information_game.save()
        information_game.developers.add(developer)
        information_game.awards.add(award_game)

    @pytest.mark.django_db
    def test_serialization_game_object(self, data):
        game = Game.objects.last()
        serialized_game = GameSerializer(game).data

        information_serialized = serialized_game.get('information')
        developer_serialized = information_serialized.get('developers')[0]
        award_serialized = information_serialized.get('awards')[0]

        package_serialized = serialized_game.get('packages')[0]
        platform_serialized = package_serialized.get('platforms')[0]

        image_serialized = serialized_game.get('media_image')[0]
        video_serialized = serialized_game.get('media_video')[0]
        sound_serialized = serialized_game.get('media_soundtrack')[0]

        assert serialized_game.get('name') == game.name

        assert serialized_game.get('cover_image') == game.cover_image.url

        assert serialized_game.get('official_repository') == game.official_repository

        assert serialized_game.get('version') == game.version

        assert image_serialized.get('image') == game.media_image.first().image.url

        assert video_serialized.get('video') == game.media_video.first().video.url

        assert sound_serialized.get('soundtrack') == game.media_soundtrack.first().soundtrack.url

        assert information_serialized.get('description') == game.information.description

        assert information_serialized.get('launch_year') == game.information.launch_year

        assert developer_serialized.get('name') == game.information.developers.first().name

        assert developer_serialized.get('login') == game.information.developers.first().login

        assert developer_serialized.get('github_page') == game.information.developers.first().github_page

        assert award_serialized.get('name') == game.information.awards.first().name

        assert award_serialized.get('year') == game.information.awards.first().year

        assert award_serialized.get('place') == game.information.awards.first().place

        assert package_serialized.get('package') == game.packages.first().package.url

        assert platform_serialized.get('name') == game.packages.first().platforms.first().name

        assert platform_serialized.get('extensions') == game.packages.first().platforms.first().extensions

        assert platform_serialized.get('icon') == game.packages.first().platforms.first().icon.url

        game.delete()
