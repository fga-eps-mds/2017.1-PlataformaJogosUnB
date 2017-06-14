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
            'description': 'a' * 51,
            'launch_year': 1980,
            'game_id': GameFactory().pk
        }

    @pytest.mark.django_db
    @pytest.mark.parametrize("serial_fixture, attr", [
        (developer_serial, 'developers'),
        (award_serial, 'awards'),
        (genre_serial, 'genres'),
    ])
    def test_information_nested__save(self, information_serial,
                                      serial_fixture, attr):
        nested_serial = serial_fixture()
        nested_serial2 = nested_serial.copy()
        nested_serial['name'] = 'Second'
        information_serial[attr] = [nested_serial2,
                                    nested_serial]

        serial = InformationSerializer(data=information_serial)
        assert serial.is_valid()
        serial.save()
        assert Information.objects.count() == 1

        assert getattr(Information.objects.last(), attr).count() == 2
