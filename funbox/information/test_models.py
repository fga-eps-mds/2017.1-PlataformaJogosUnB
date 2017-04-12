import unittest
import pytest
from game.models import Game
from information.models import Information

def information_creation(description="", launch_year=0):
    return Information(description=description, launch_year=launch_year)

def mount_error_dict(keys, values):
    return dict([x for x in zip(keys, values)])

@pytest.fixture
def information_created():
    information = Information()
    information.description = 'a' * 51
    information.launch_year = 2017
    print (information.save())

    return information


class TestBasicdb:

    @pytest.mark.django_db
    def test_create_information_with_valid_atributtes(self,information_created):
        information = Information.objects.get(pk=information_created.pk)
        print("olha: %s", information)
        assert information_created == information

class TestValidation:
    error_message_blank = "Este campo não pode estar vazio."
    error_not_a_integer = "valor deve ser um inteiro."
    error_message_min_value = "A game description must have \
      at least 50 characters!"

    @pytest.mark.django_db
    @pytest.mark.parametrize("information, errors_dict", [
            (information_creation(description="", launch_year=2017),
             mount_error_dict(["description"], [[error_message_min_value]])),
            (information_creation(description="a simple description", launch_year=""),
             mount_error_dict(["launch_year"], [[error_not_a_integer]])),
        ])
    def test_description_shoudnt_be_null(self, information, errors_dict):
        from django.core.exceptions import ValidationError
        with pytest.raises(ValidationError)as validation_error:
            information.save()
        print(dict(validation_error.__dict__))
        assert validation_error.value.message_dict == errors_dict
