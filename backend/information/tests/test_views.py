import pytest
from information.factory import InformationFactory
from information.models import Genre, Rating
from information.serializers import GenreSerializer


class TestGenreList:

    @pytest.fixture
    def response_list(self, client):
        return client.get('/api/genres/')

    @pytest.mark.django_db
    def test_access_route_genres(self, response_list):
        assert 200 <= response_list.status_code < 300

    @pytest.mark.django_db
    def test_data_genres(self, response_list):
        genres = Genre.objects.all()
        assert response_list.data is not None
        assert response_list.data == GenreSerializer(genres, many=True).data

class TestVoteView:

    @pytest.fixture
    def information(self):
        information = InformationFactory()
        rating = Rating(vote=True,user_voter="test",information=information)
        rating.save()
        return information

    @pytest.fixture
    def rating(self, information):
        rating = Rating(vote=True,user_voter="test2",information=information)
        rating.save()
        return rating

    @pytest.fixture
    def response_vote(self, client, information):
        return client.get("/api/vote/{0}/".format(information.pk))

    @pytest.mark.django_db
    def test_access_route_vote(self, response_vote):
        print(response_vote.data)
        assert 200 <= response_vote.status_code < 300

    @pytest.mark.django_db
    def test_data_vote(self, response_vote):
        vote = {'likes': 1,'dislikes': 0}
        assert response_vote is not None
        assert response_vote.data == vote

    @pytest.mark.django_db
    def test_post(self, client, information, rating):
        response = client.post("/api/vote/{0}".format(information.pk),
                               data=rating,
                               content_type="application/json")
        print(response)
        print(information.likes)
        assert 200 <= response.status_code < 300
        assert information.likes == 2
   
