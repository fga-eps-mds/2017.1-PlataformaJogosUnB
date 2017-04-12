import unittest
import pytest
from game.models import Game
from information.models import Information

def information_creation(description="", launch_year=0):
    return Information(description=description, launch_year=launch_year)

def mount_error_dict(keys, values):
    return dict([x for x in zip(keys, values)])

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
    error_message_null = 'Este campo não pode ser nulo.'
    error_message_blank = "Este campo não pode estar vazio."
    error_not_a_integer = "'' valor deve ser um inteiro."
    error_message_min_value = "A game description must have at least 50 \
characters!"
    error_launch_year_past = 'Our University had not been built at this\
 time!'
    error_launch_year_future = 'We believe the game did not come from future!'
    short_description = "short description"
    description = "simple description" * 3

    @pytest.mark.django_db
    @pytest.mark.parametrize("information, errors_dict", [
        (information_creation(description=None, launch_year=2017),
        mount_error_dict(["description"], [[error_message_null]])),
        (information_creation(description="", launch_year=2017),
        mount_error_dict(["description"], [[error_message_blank]])),
        (information_creation(description=short_description, launch_year=2017),
        mount_error_dict(["description"], [[error_message_min_value]])),
        (information_creation(description=description, launch_year=""),
        mount_error_dict(["launch_year"], [[error_not_a_integer]])),
        (information_creation(description=description, launch_year=1961),
        mount_error_dict(["launch_year"], [[error_launch_year_past]])),
        (information_creation(description=description, launch_year=now()+1),
        mount_error_dict(["launch_year"], [[error_launch_year_future]])),
    ])
    def test_description_shoudnt_be_null(self, information, errors_dict):
        from django.core.exceptions import ValidationError
        with pytest.raises(ValidationError)as validation_error:
            information.save()
        print(dict(validation_error.__dict__))
        assert validation_error.value.message_dict == errors_dict
