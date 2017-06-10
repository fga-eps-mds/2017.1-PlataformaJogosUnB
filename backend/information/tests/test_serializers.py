from information.models import Award, Developer, Genre, Information
from information.serializers import GenreSerializer
from information.serializers import DeveloperSerializer
from information.serializers import AwardSerializer
from game.factory import GameFactory
from information.serializers import InformationSerializer
import pytest


@pytest.fixture
def award_serial():
    return {
        "name": 'VGA',
        "year": 2017,
        "place": 'UnB'
    }


@pytest.fixture
def developer_serial():
    return {
        'name': 'Developer',
        'login': 'developer',
        'github_page': 'http://github.com/developer',
        'email': 'developer@gmail.com',
    }


@pytest.fixture
def genre_serial():
    return {
        'name': 'Race',
        'description': 'Games like fast and furious'
    }


class TestGenreSerializer:

    @pytest.mark.django_db
    def test_serialization_genre(self, genre_serial):
        genre = Genre(
            name='Race',
            description='Games like fast and furious')
        genre_serialized = GenreSerializer(genre).data
        assert genre_serialized == genre_serial


class TestAwardSerializer:

    @pytest.mark.django_db
    def test_serialization_award(self, award_serial):
        award = Award(name='VGA', year='2017', place='UnB')

        award_serialized = AwardSerializer(award).data
        assert award_serial == award_serialized


class TestDeveloperSerializer:

    @pytest.mark.django_db
    def test_serialization_developer(self, developer_serial):
        developer = Developer(
            name='Developer',
            avatar='none',
            login='developer',
            email='developer@gmail.com',
            github_page='http://github.com/developer')

        developer_serialized = DeveloperSerializer(developer).data
        developer_serial['avatar'] = '/public/none'
        assert developer_serialized == developer_serial


class TestInformationSerializer:

    @pytest.fixture
    def information_serial(self):
        return {
            'description': 'a'*51,
            'launch_year': 1980,
            'game_id': GameFactory().pk
        }

    @pytest.mark.django_db
    def test_nested_developer_save(self, information_serial, developer_serial):
        developer_serial2 = developer_serial.copy()
        developer_serial['name'] = 'Developer 2'
        information_serial['developers'] = [developer_serial2,
                                            developer_serial]

        serial = InformationSerializer(data=information_serial)
        assert serial.is_valid()
        serial.save()
        assert Information.objects.count() == 1
        assert Information.objects.last().developers.count() == 2

    @pytest.mark.django_db
    def test_nested_award_save(self, information_serial, award_serial):
        award_serial2 = award_serial.copy()
        award_serial['name'] = 'Award 2'
        information_serial['awards'] = [award_serial2, award_serial]

        serial = InformationSerializer(data=information_serial)
        assert serial.is_valid()
        serial.save()
        assert Information.objects.count() == 1
        assert Information.objects.last().awards.count() == 2

    @pytest.mark.django_db
    def test_nested_genre_save(self, information_serial, genre_serial):
        genre_serial2 = genre_serial.copy()
        genre_serial['name'] = 'Genre 2'
        information_serial['genres'] = [genre_serial2, genre_serial]

        serial = InformationSerializer(data=information_serial)
        assert serial.is_valid()
        serial.save()
        assert Information.objects.count() == 1
        assert Information.objects.last().genres.count() == 2
