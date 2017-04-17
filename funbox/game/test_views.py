import pytest

class TestRoute:

    @pytest.mark.django_db
    def test_view_basic(self, client):
        response = client.get('/games/game-list.json')
        assert response.status_code == 200
        print(dir(response))
        assert True
