import pytest
from information.factory import InformationFactory
from information.models import Genre, Rating
from information.serializers import GenreSerializer


class TestGenreList:

    @pytest.fixture
    def information(self):
        information = InformationFactory()
        rating = Rating(vote=True,email_voter="test@test.com",information=information)
        rating.save()
        return information

    @pytest.fixture
    def response_list(self, client):
        return client.get('/api/genres/')

    @pytest.mark.django_db
    def test_access_route_genres(self, response_list):
        assert 200 <= response_list.status_code < 300

    @pytest.fixture
    def response_vote(self, client, information):
        return client.get("/api/vote/{0}/".format(information.pk))

    @pytest.mark.django_db
    def test_access_route_vote(self, response_vote):
        print(response_vote.data)
        assert 200 <= response_vote.status_code < 300

    @pytest.mark.django_db
    def test_data_genres(self, response_list):
        genres = Genre.objects.all()
        assert response_list.data is not None
        assert response_list.data == GenreSerializer(genres, many=True).data

    @pytest.mark.django_db
    def test_data_vote(self, response_vote):
        vote = {'likes': 1,'dislikes': 0}
        assert response_vote is not None
        assert response_vote.data == vote
