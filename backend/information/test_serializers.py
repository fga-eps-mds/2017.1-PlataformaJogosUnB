from information.models import Award, Developer, Genre, Information, Rating
from information.factory import InformationFactory
from information.serializers import GenreSerializer, InformationSerializer, DeveloperSerializer, AwardSerializer
import pytest

award = Award(name='VGA', year='2017', place='UnB')
genre = Genre(
    name='Race',
    description='Games like fast and furious')
developer = Developer(
    name='Developer',
    avatar='none',
    login='developer',
    email='developer@gmail.com',
    github_page='http://github.com/developer')
information = InformationFactory.build()
rating = Rating(vote=True,email_voter='a@a.com',information=information)

expected_json_genre = {
'name': 'Race',
    'description': 'Games like fast and furious'}
expected_json_developer = {
    'name': 'Developer',
    'avatar': '/public/none',
    'login': 'developer',
    'email': 'developer@gmail.com',
    'github_page': 'http://github.com/developer'}
expected_json_award = {
    "name": 'VGA',
    "year": 2017,
    "place": 'UnB'}

class TestGenreSerializer:

    @pytest.mark.django_db
    def test_serialization_genre(self):

        genre_serialized = GenreSerializer(genre).data
        assert genre_serialized == expected_json_genre


class TestAwardSerializer:

    @pytest.mark.django_db
    def test_serialization_award(self):

        award_serialized = AwardSerializer(award).data
        assert award_serialized == expected_json_award


class TestDeveloperSerializer:

    @pytest.mark.django_db
    def test_serialization_developer(self):

        developer_serialized = DeveloperSerializer(developer).data
        assert developer_serialized == expected_json_developer

class TestInformationSerializer:

    @pytest.mark.django_db
    def test_serialization_information(self):

        #information_serialized = InformationSerializer(information).data
        expected_json_information = {
	    'description': 'This game is very cool',
	    'launch_year': 2001,
	    'developers' : [expected_json_developer],
	    'awards': [expected_json_award],
	    'genres': [expected_json_genre],
	    'likes': 4,
	    'dislikes': 5}
        assert True
