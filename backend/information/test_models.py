import pytest
from game.models import Game
from core.helper_test import (
    validation_test,
    mount_error_dict,
    ErrorMessage
)
from information.models import Information, Award, Genre, Developer


def information_creation(description="", launch_year=0, game=None):
    return Information(description=description, launch_year=launch_year,
                       game=game)


def now():
    from datetime import datetime
    year = datetime.now().year
    return year


@pytest.fixture
def information_created():
    game = Game(
        name="Teste",
        cover_image="Imagem_teste.jpg",
        official_repository="http://a.aa")
    game.save()
    information = Information(description="a" * 51,
                              launch_year=now(), game=game)
    information.save()
    return information


class TestInformationCreation:

    @pytest.mark.django_db
    def test_create_information_with_valid_atributtes(self,
                                                      information_created):
        information = Information.objects.get(pk=information_created.pk)
        assert information_created == information

    @pytest.mark.django_db
    def test_str_information(self, information_created):
        description = 'a' * 50
        assert str(information_created) == "Teste's description: %s..." \
            % description


class TestInformationValidation:
    error_message_min_value = "A game description must have at least 50 \
characters!"
    short_description = "short description"
    error_message_year_future = 'We believe the game was not won ' \
        'in the future!'
    description = "simple description" * 3
    game = Game(
        name="Teste",
        cover_image="Imagem_de_capa.jpg",
        official_repository="http://a.aa")

    @pytest.mark.django_db
    @pytest.mark.parametrize("description, launch_year, game, errors_dict", [
        (description, None, game,
         mount_error_dict(["launch_year"], [[ErrorMessage.NULL]])),
        (description, "", game,
         mount_error_dict(["launch_year"], [[ErrorMessage.NOT_INTEGER]])),
        (description, 1961, game,
         mount_error_dict(["launch_year"], [[ErrorMessage.YEAR_PAST]])),
        (description, now() + 1, game,
         mount_error_dict(["launch_year"], [[error_message_year_future]])),
    ])
    def test_launch_year_validation(self, description, launch_year,
                                    game, errors_dict):
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

    @staticmethod
    def parametrized_str(attribute):

        error_message_max_length = 'Certifique-se de que o valor tenha no '\
            'máximo 100 caracteres (ele possui 101).'

        return [
            ('', 2016, 'Unb-Gama',
             mount_error_dict([attribute], [[ErrorMessage.BLANK]])),
            (None, 2016, 'Unb-Gama',
             mount_error_dict([attribute], [[ErrorMessage.NULL]])),
            ('a' * 101, 2016, 'Unb-Gama',
             mount_error_dict([attribute], [[error_message_max_length]])),
        ]

    @pytest.mark.django_db
    @pytest.mark.parametrize("name, year, place, errors_dict",
                             parametrized_str.__func__('name'))
    def test_name_validation(self, name, year, place, errors_dict):
        award = Award(name=name, place=place, year=year)
        validation_test(award, errors_dict)

    @pytest.mark.django_db
    @pytest.mark.parametrize("name, year, place, errors_dict", [
        ('award_name', 1900, 'Unb-Gama',
         mount_error_dict(["year"], [[ErrorMessage.YEAR_PAST]])),
        ('award_name', 2018, 'Unb-Gama',
         mount_error_dict(["year"], [[error_message_year_future]])),
        ('award_name', None, 'Unb-Gama',
         mount_error_dict(["year"], [[ErrorMessage.NULL]])),
        ('award_name', '', 'Unb-Gama',
         mount_error_dict(["year"], [[ErrorMessage.NOT_INTEGER]])),
    ])
    def test_year_validation(self, name, year, place, errors_dict):
        award = Award(name=name, place=place, year=year)
        validation_test(award, errors_dict)

    @pytest.mark.django_db
    @pytest.mark.parametrize("place, year, name, errors_dict",
                             parametrized_str.__func__('place'))
    def test_place_validation(self, place, year, name, errors_dict):
        award = Award(name=name, place=place, year=year)
        validation_test(award, errors_dict)

    @pytest.mark.django_db
    def test_award_save(self, award_creation):
        award = Award.objects.get(pk=award_creation.pk)
        assert award == award_creation

    @pytest.mark.django_db
    def test_str_award(self, award_creation):
        assert str(award_creation) == "UnB (%d): %s" % (now(), "award")


@pytest.fixture
def genre_creation():
    genre = Genre.objects.create(name="Genre", description="Here is only the'\
                                description of genre ")
    return genre


class TestGenre:

    @pytest.mark.django_db
    def test_genre_save(self, genre_creation):
        genre = Genre.objects.get(pk=genre_creation.pk)
        assert genre == genre_creation

    @pytest.mark.django_db
    def test_str_genre(self, genre_creation):
        genre = Genre.objects.get(pk=genre_creation.pk)
        assert str(genre_creation) == genre.name


def genre_created(name="Corrida", description=""):
    return Genre(name=name, description=description)


class TestGenreValidation:

    error_message_min_value = 'A genre description must have \
at least 20 characters!'
    short_description = "short description"

    error_message_max_length = 'Certifique-se de que o valor tenha no '\
        'máximo 100 caracteres (ele possui 101).'

    @pytest.mark.django_db
    @pytest.mark.parametrize("name, description, errors_dict", [
        ('Race', None,
         mount_error_dict(["description"], [[ErrorMessage.NULL]])),
        ("Race", "",
         mount_error_dict(["description"], [[ErrorMessage.BLANK]])),
        ('Race', short_description,
         mount_error_dict(["description"], [[error_message_min_value]])),
    ])
    def test_description_validation(self, name, description,
                                    errors_dict):
        genre = genre_created(name, description)
        validation_test(genre, errors_dict)

    @pytest.mark.django_db
    @pytest.mark.parametrize("name, description, errors_dict", [
        ('', 'description' * 4,
         mount_error_dict(["name"], [[ErrorMessage.BLANK]])),
        (None, 'description' * 4,
         mount_error_dict(["name"], [[ErrorMessage.NULL]])),
        ('a' * 101, 'description' * 4,
         mount_error_dict(["name"], [[error_message_max_length]])),
    ])
    def test_name_validation(self, name, description, errors_dict):
        genre = Genre(name=name, description=description)
        validation_test(genre, errors_dict)


@pytest.fixture
def developer_creation():
    developer = Developer.objects.create(name="Developer", login="login",
                                         email="developer@gmail.com",
                                         github_page="https://github.com/dev")
    return developer


class TestDeveloperAvatar:

    @pytest.mark.django_db
    @pytest.mark.parametrize(('name, avatar, login, email, github_page,' +
                             ' errors_dict'), [
        ('developer_name', 'avatar.ppm', 'developer_login',
            'devel@host.com', 'https://devel.com',
         mount_error_dict(['avatar'], [[ErrorMessage.IMAGE_EXTENSION]])),
        ('developer_name', 'avatar.py', 'developer_login',
         'devel@host.com', 'https://devel.com',
         mount_error_dict(['avatar'], [[ErrorMessage.NOT_IMAGE.value[0],
                                        ErrorMessage.NOT_IMAGE.value[1]]])),
    ])
    def test_avatar_valid_extension(self, name, avatar, login,
                                    email, github_page, errors_dict):
        developer = Developer(
            name=name,
            avatar=avatar,
            login=login,
            email=email,
            github_page=github_page
        )
        validation_test(developer, errors_dict)

    @pytest.mark.django_db
    def test_avatar_invalid_extension(self):
        developer = Developer(
            name='developer_name',
            avatar='avatar.jpg',
            login='developer',
            email='devel@host.com',
            github_page='https://devel.com'
        )
        developer.save()
        assert Developer.objects.last() == developer


class TestDeveloper:

    @pytest.mark.django_db
    def test_developer_save(self, developer_creation):
        developer = Developer.objects.get(pk=developer_creation.pk)
        assert developer == developer_creation

    @pytest.mark.django_db
    def test_str_developer(self, developer_creation):
        assert str(developer_creation) == "Developer <https://github.com/dev>"
