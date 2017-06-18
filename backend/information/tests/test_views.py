import pytest
from information.factory import GenreFactory
from information.models import Genre
from information.serializers import GenreSerializer


class TestGenreList:

    @pytest.fixture
    def genres(self):
        return GenreFactory.create_batch(5)

    @pytest.fixture
    def response_list(self, client, genres):
        return client.get('/api/genres')

    @pytest.mark.django_db
    def test_access_route(self, response_list):
        assert 200 <= response_list.status_code < 300

    @pytest.mark.django_db
    def test_data_genres(self, response_list):
        genres = Genre.objects.all()
        assert response_list.data is not None
        assert response_list.data == GenreSerializer(genres, many=True).data
