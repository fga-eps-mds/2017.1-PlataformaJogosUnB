from information.models import Award, Developer, Genre
from information.serializers import GenreSerializer
from information.serializers import DeveloperSerializer
from information.serializers import AwardSerializer
import pytest


class TestGenreSerializer:

    @pytest.mark.django_db
    def test_serialization_genre(self):
        genre = Genre(
            name='Race',
            description='Games like fast and furious')

        genre_serialized = GenreSerializer(genre).data
        expected_json_genre = {
            'name': 'Race',
            'description': 'Games like fast and furious'}
        assert genre_serialized == expected_json_genre


class TestAwardSerializer:

    @pytest.mark.django_db
    def test_serialization_award(self):
        award = Award(name='VGA', year='2017', place='UnB')

        award_serialized = AwardSerializer(award).data
        expected_json_award = {
            "name": 'VGA',
            "year": 2017,
            "place": 'UnB'}
        assert award_serialized == expected_json_award


class TestDeveloperSerializer:

    @pytest.mark.django_db
    def test_serialization_developer(self):
        developer = Developer(
            name='Developer',
            avatar='none',
            login='developer',
            email='developer@gmail.com',
            github_page='http://github.com/developer')

        developer_serialized = DeveloperSerializer(developer).data
        expected_json_developer = {
            'name': 'Developer',
            'avatar': '/public/none',
            'login': 'developer',
            'email': 'developer@gmail.com',
            'github_page': 'http://github.com/developer'}
        assert developer_serialized == expected_json_developer
