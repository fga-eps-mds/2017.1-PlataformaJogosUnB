import unittest
import pytest
from core.helper_test import validation_test, mount_error_dict, ErrorMessage
from game.models import Game
from information.models import Information, Award

def information_creation(description="", launch_year=0, game=None):
    return Information(description=description, launch_year=launch_year,
        game=game)

def now():
    from datetime import datetime
    year = datetime.now().year
    return year


@pytest.fixture
def information_created():
    game = Game(name="Teste", official_repository="http://a.aa")
    game.save()
    information = Information(description="a"*51, launch_year=now(), game=game)
    information.save()
    return information

class TestInformationCreation:

    @pytest.mark.django_db
    def test_create_information_with_valid_atributtes
        (self, information_created):
        information = Information.objects.get(pk=information_created.pk)
        assert information_created == information

    @pytest.mark.django_db
    def test_str_information(self, information_created):
        description = 'a'*50
        assert str(information_created) == "Information description: %s..." \
            % description

class TestInformationValidation:
    error_message_min_value = "A game description must have at least 50 \
characters!"
    short_description = "short description"
    error_message_year_future = 'We believe the game did not come from future!'
    description = "simple description" * 3
    game = Game(name="Teste", official_repository="http://a.aa")

    @pytest.mark.django_db
    @pytest.mark.parametrize("description, launch_year, game, errors_dict", [
        (description, None, game,
        mount_error_dict(["launch_year"], [[ErrorMessage.NULL]])),
        (description, "", game,
        mount_error_dict(["launch_year"], [[ErrorMessage.NOT_INTEGER]])),
        (description, 1961, game,
        mount_error_dict(["launch_year"], [[ErrorMessage.YEAR_PAST]])),
        (description, now()+1, game,
        mount_error_dict(["launch_year"], [[error_message_year_future]])),
    ])
    def test_launch_year_validation
        (self, description, launch_year, game, errors_dict):
        game.save()
        information = information_creation(description, launch_year, game)
        validation_test(information, errors_dict)

    @pytest.mark.django_db
    @pytest.mark.parametrize("description, launch_year, game, errors_dict", [
        (None, 2017, game,
        mount_error_dict(["description"], [[ErrorMessage.NULL]])),
        ("", 2017, game,
        mount_error_dict(["description"], [[ErrorMessage.BLANK]])),
        (short_description, 2017, game,
        mount_error_dict(["description"], [[error_message_min_value]])),
    ])
    def test_description_validation(self, description, launch_year, game,
        errors_dict):
        game.save()
        information = information_creation(description, launch_year, game)
        validation_test(information, errors_dict)


@pytest.fixture
def award_creation():
    award = Award.objects.create(name="award", place="UnB", year=now())
    award.save()
    return award


class TestAward:
    error_message_year_future = 'We believe the award was not won in the\
 future!'
    error_message_max_length= 'Certifique-se de que o valor tenha no máximo 100\
 caracteres (ele possui 101).'

    @pytest.mark.django_db
    @pytest.mark.parametrize("name, year, place, errors_dict", [
        ('', 2016, 'Unb-Gama',
        mount_error_dict(["name"], [[ErrorMessage.BLANK]])),
        (None, 2016, 'Unb-Gama',
        mount_error_dict(["name"], [[ErrorMessage.NULL]])),
        ('a'*101, 2016, 'Unb-Gama',
        mount_error_dict(["name"], [[error_message_max_length]])),
    ])
    def test_name_validation(self, name, year, place, errors_dict):
        award = Award(name=name, place=place, year=year)
        validation_test(award, errors_dict)

    @pytest.mark.django_db
    @pytest.mark.parametrize("name, year, place, errors_dict", [
        ('description', 1900, 'Unb-Gama',
        mount_error_dict(["year"], [[ErrorMessage.YEAR_PAST]])),
        ('description', 2018, 'Unb-Gama',
        mount_error_dict(["year"], [[error_message_year_future]])),
        ('description', None, 'Unb-Gama',
        mount_error_dict(["year"], [[ErrorMessage.NULL]])),
        ('description', '', 'Unb-Gama',
        mount_error_dict(["year"], [[ErrorMessage.NOT_INTEGER]])),
    ])
    def test_year_validation(self, name, year, place, errors_dict):
        award = Award(name=name, place=place, year=year)
        validation_test(award, errors_dict)

    @pytest.mark.django_db
    @pytest.mark.parametrize("place, year, name, errors_dict", [
        ('', 2016, 'Unb-Gama',
        mount_error_dict(["place"], [[ErrorMessage.BLANK]])),
        (None, 2016, 'Unb-Gama',
        mount_error_dict(["place"], [[ErrorMessage.NULL]])),
        ('a'*101, 2016, 'Unb-Gama',
        mount_error_dict(["place"], [[error_message_max_length]])),
    ])
    def test_place_validation(self, place, year, name, errors_dict):
        award = Award(name=name, place=place, year=year)
        validation_test(award, errors_dict)

    @pytest.mark.django_db
    def test_award_save(self, award_creation):
        award = Award.objects.get(pk=award_creation.pk)
        assert award == award_creation

    @pytest.mark.django_db
    def test_str_award(self, award_creation):
        assert str(award_creation) == "Award (%d): %s" % (now(), "award")
