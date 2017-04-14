import unittest
import pytest
from core.helper_test import validation_test, mount_error_dict, ErrorMessage
from game.models import Game
from information.models import Information

def information_creation(description="", launch_year=0):
    return Information(description=description, launch_year=launch_year)


def now():
    from datetime import datetime
    year = datetime.now().year
    return year


@pytest.fixture
def information_created():
    information = Information()
    information.description = 'a' * 51
    information.launch_year = now()
    print (information.save())

    return information


class TestInformationCreation:

    @pytest.mark.django_db
    def test_create_information_with_valid_atributtes(self,information_created):
        information = Information.objects.get(pk=information_created.pk)
        print("olha: %s", information)
        assert information_created == information

class TestInformationValidation:
    error_message_min_value = "A game description must have at least 50 \
characters!"
    error_launch_year_past = 'Our University had not been built at this\
 time!'
    error_launch_year_future = 'We believe the game did not come from future!'
    short_description = "short description"
    description = "simple description" * 3

    @pytest.mark.django_db
    @pytest.mark.parametrize("information, errors_dict", [
        (information_creation(description=description, launch_year=None),
        mount_error_dict(["launch_year"], [[ErrorMessage.NULL]])),
        (information_creation(description=description, launch_year=""),
        mount_error_dict(["launch_year"], [[ErrorMessage.NOT_INTEGER]])),
        (information_creation(description=description, launch_year=1961),
        mount_error_dict(["launch_year"], [[error_launch_year_past]])),
        (information_creation(description=description, launch_year=now()+1),
        mount_error_dict(["launch_year"], [[error_launch_year_future]])),
    ])
    def test_launch_year_validation(self, information, errors_dict):
        validation_test(information, errors_dict)

    @pytest.mark.django_db
    @pytest.mark.parametrize("information, errors_dict", [
        (information_creation(description=None, launch_year=2017),
        mount_error_dict(["description"], [[ErrorMessage.NULL]])),
        (information_creation(description="", launch_year=2017),
        mount_error_dict(["description"], [[ErrorMessage.BLANK]])),
        (information_creation(description=short_description, launch_year=2017),
        mount_error_dict(["description"], [[error_message_min_value]])),
    ])
    def test_description_validation(self, information, errors_dict):
        validation_test(information, errors_dict)
