import pytest
from game.models import Game
from information.models import Information

@pytest.fixture
def information_created():
    information = Information()
    information.description = 'bla'
    information.launch_year = 2017
    print (information.save())

    return information


class TestBasicdb:

    @pytest.mark.django_db
    def test_create_information(self,information_created):
        information = Information.objects.get(pk=information_created.pk)
        print("olha: %s", information.pk)
        assert information_created == information
