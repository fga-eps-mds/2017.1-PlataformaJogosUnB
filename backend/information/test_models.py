import pytest
from game.factory import GameFactory
from core.helper_test import (
    validation_test,
    mount_error_dict,
    ErrorMessage
)
from information.models import Information, Award, Genre, Developer, Statistic
from information.factory import (
    InformationFactory,
    AwardFactory,
    GenreFactory,
    DeveloperFactory
)


def now():
    from datetime import datetime
    year = datetime.now().year
    return year


class TestInformationCreation:

    @pytest.fixture
    def information_created(self):
        return InformationFactory()

    @pytest.mark.django_db
    def test_create_information_with_valid_atributtes(self,
                                                      information_created):
        information = Information.objects.get(pk=information_created.pk)
        assert information_created == information

    @pytest.mark.django_db
    def test_str_information(self, information_created):
        description = information_created.description[:50]
        name = information_created.game.name
        assert str(information_created) == "%s's description: %s..." \
            % (name, description)


class TestInformationValidation:
    error_message_min_value = "A game description must have at least 50 \
characters!"
    error_message_year_future = 'We believe the game was not won ' \
        'in the future!'

    @pytest.fixture
    def game(self):
        return GameFactory()

    @pytest.mark.django_db
    @pytest.mark.parametrize("launch_year, errors_dict", [
        (None, mount_error_dict(["launch_year"], [[ErrorMessage.NULL]])),
        ("", mount_error_dict(["launch_year"], [[ErrorMessage.NOT_INTEGER]])),
        (1961, mount_error_dict(["launch_year"], [[ErrorMessage.YEAR_PAST]])),
        (now() + 1,
         mount_error_dict(["launch_year"], [[error_message_year_future]])),
    ])
    def test_launch_year_validation(self, launch_year, errors_dict, game):
        information = InformationFactory.build(launch_year=launch_year,
                                               game=game)
        validation_test(information, errors_dict)

    @pytest.mark.django_db
    @pytest.mark.parametrize("description, errors_dict", [
        (None, mount_error_dict(["description"], [[ErrorMessage.NULL]])),
        ("", mount_error_dict(["description"], [[ErrorMessage.BLANK]])),
        ('short',
         mount_error_dict(["description"], [[error_message_min_value]])),
    ])
    def test_description_validation(self, description, errors_dict, game):
        information = InformationFactory.build(description=description,
                                               game=game)
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


class TestGenreValidation:

    error_message_min_value = 'A genre description must have \
at least 20 characters!'
    short_description = "short description"

    error_message_max_length = 'Certifique-se de que o valor tenha no '\
        'máximo 100 caracteres (ele possui 101).'

    @pytest.mark.django_db
    @pytest.mark.parametrize("description, errors_dict", [
        (None, mount_error_dict(["description"], [[ErrorMessage.NULL]])),
        ("", mount_error_dict(["description"], [[ErrorMessage.BLANK]])),
        (short_description,
         mount_error_dict(["description"], [[error_message_min_value]])),
    ])
    def test_description_validation(self, description,
                                    errors_dict):
        genre = GenreFactory.build(description=description)
        validation_test(genre, errors_dict)

    @pytest.mark.django_db
    @pytest.mark.parametrize("name, errors_dict", [
        ('', mount_error_dict(["name"], [[ErrorMessage.BLANK]])),
        (None, mount_error_dict(["name"], [[ErrorMessage.NULL]])),
        ('a' * 101, mount_error_dict(["name"], [[error_message_max_length]])),
    ])
    def test_name_validation(self, name, errors_dict):
        genre = GenreFactory.build(name=name)
        validation_test(genre, errors_dict)


class TestDeveloperAvatar:

    @pytest.mark.django_db
    @pytest.mark.parametrize(('avatar', 'errors_dict'), [
        ('avatar.ppm',
         mount_error_dict(['avatar'], [[ErrorMessage.IMAGE_EXTENSION]])),
        ('avatar.py',
         mount_error_dict(['avatar'], [[ErrorMessage.NOT_IMAGE.value[0],
                                        ErrorMessage.NOT_IMAGE.value[1]]])),
    ])
    def test_avatar_valid_extension(self, avatar, errors_dict):
        developer = DeveloperFactory.build(
            avatar=avatar,
        )
        validation_test(developer, errors_dict)

    @pytest.mark.django_db
    def test_avatar_invalid_extension(self):
        developer = DeveloperFactory()
        assert Developer.objects.last() == developer


@pytest.fixture
def developer_creation():
    return DeveloperFactory()


class TestDeveloper:

    @pytest.mark.django_db
    def test_developer_save(self, developer_creation):
        developer = Developer.objects.get(pk=developer_creation.pk)
        assert developer == developer_creation

    @pytest.mark.django_db
    def test_str_developer(self, developer_creation):
        name = developer_creation.name
        url = developer_creation.github_page
        assert str(developer_creation) == "{} <{}>".format(name, url)


class TestStatistic:

    def test_str(self):
        statistic = Statistic(downloads_amount=30, accesses_amount=10)
        assert str(statistic) == 'statistic: 10'


class TestInformationRelations:

    @pytest.fixture
    def information_relations(self):
        awards = AwardFactory.create_batch(3)
        developers = DeveloperFactory.create_batch(3)
        genres = GenreFactory.create_batch(3)

        return InformationFactory(genres=genres,
                                  developers=developers,
                                  awards=awards)

    @pytest.mark.parametrize("field, length", [
        ("awards", 3),
        ("developers", 3),
        ("genres", 3)
    ])
    @pytest.mark.django_db
    def test_informatino_award(self, field, length, information_relations):
        assert getattr(information_relations, field).count() == length
