import pytest
from game.factory import PackageFactory, PlatformFactory
from game.serializers import GameSerializer
from information.factory import GenreFactory, InformationFactory
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


class TestGenreStatistic:

    @pytest.fixture
    def genres(self):
        return [GenreFactory(name=name) for name in [
            'genre1', 'genre2', 'genre3', 'genre4']]

    def __information__(self, genres):
        return InformationFactory(genres=genres).game

    def __games__(self, genres, field, factor):
        PlatformFactory()
        print(genres)
        info1 = self.__information__([genres[0], genres[1]])
        info2 = self.__information__([genres[2], genres[3]])
        info3 = self.__information__([genres[1], genres[2], genres[3]])
        info4 = self.__information__(genres)
        games = {genres[0].name: [info1, info4],
                 genres[1].name: [info1, info3, info4],
                 genres[2].name: [info2, info3, info4],
                 genres[3].name: [info2, info3, info4],
                 }
        for info in [info1, info2, info3, info4]:
            PackageFactory(game=info)

        f = -1 if factor == '-' else 1
        for key in games:
            games[key].sort(key=lambda x: f * getattr(x, field))
            games[key] = GameSerializer(games[key], many=True)
            games[key] = games[key].data
        return games

    @pytest.mark.django_db
    @pytest.mark.parametrize('field', ['visualization', 'downloads'])
    @pytest.mark.parametrize('factor', ['', '-'])
    def test_group_information(self, client, genres, field, factor):
        games = self.__games__(genres, field, factor)

        response = client.get('/api/genres/games/?ordering={}{}'.format(
            factor, field))

        for key in response.data:
            assert games[key] == response.data[key]
        for key in games:
            assert games[key] == response.data[key]
