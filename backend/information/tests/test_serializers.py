from information.models import Award, Credit, Genre
from information.serializers import GenreSerializer
from information.serializers import CreditSerializer
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


class TestCreditSerializer:

    @pytest.mark.django_db
    def test_serialization_credit(self):
        credit = Credit(
            specialty='desenvolvedor',
            name='Credit',
            email='credit@gmail.com',
            github_page='http://github.com/credit',
            behance_page='https://www.behance.net/credit',
            soundCloud_page='https://soundcloud.com/credit',
            personal_page='https://br.linkedin.com/credit'
        )

        credit_serialized = CreditSerializer(credit).data
        expected_json_credit = {
            'specialty': 'desenvolvedor',
            'name': 'Credit',
            'email': 'credit@gmail.com',
            'github_page': 'http://github.com/credit',
            'behance_page': 'https://www.behance.net/credit',
            'soundCloud_page': 'https://soundcloud.com/credit',
            'personal_page': 'https://br.linkedin.com/credit'
        }
        assert credit_serialized == expected_json_credit
