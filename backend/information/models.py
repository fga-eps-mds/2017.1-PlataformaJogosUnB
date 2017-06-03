from django.utils.translation import ugettext_lazy as _
from django.db import models
from game.models import Game, HELP_TEXT_IMAGES
from django.core.validators import (
    MinLengthValidator,
    EmailValidator,
    URLValidator,
)
import core.validators as general_validators
from information.validators import min_max_validators, years_validator


MIN_DESCRIPTION = 50
MIN_GENRE_DESCRIPTION = 20
MIN_SEMESTER_VALUE = 1
MAX_SEMESTER_VALUE = 2


class Award(models.Model):

    name = models.CharField(
        _('Name'),
        max_length=100,
        help_text=_('Name of the award.')
    )

    year = models.PositiveIntegerField(
        _('Year'),
        validators=min_max_validators(**years_validator('award')),
        help_text=_('Year the award was won.')
    )

    place = models.CharField(
        _('Place'),
        max_length=100,
        help_text=_('Place where the game won the award.')
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Award, self).save(*args, **kwargs)

    def __str__(self):
        return "{0} ({1}): {2}".format(self.place, self.year, self.name)


class Developer(models.Model):

    name = models.CharField(
        _('Name'),
        max_length=100,
        help_text=_('Name of the developer.')
    )

    avatar = models.ImageField(
        _('Avatar'),
        upload_to='public/avatar',
        blank=True,
        validators=[general_validators.image_extension_validator],
        help_text=_('Developer image. ' + HELP_TEXT_IMAGES)
    )

    login = models.CharField(
        _('Login'),
        max_length=50,
        help_text=_('Developer login for github.')
    )

    email = models.EmailField(
        _('E-mail'),
        validators=[EmailValidator()],
        max_length=100,
        null=True,
        blank=True,
        help_text=_('Developer contact e-mail.')
    )

    github_page = models.URLField(
        _('Github Page'),
        validators=[URLValidator()],
        help_text=_('Developer Github page.')
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Developer, self).save(*args, **kwargs)

    def __str__(self):
        return "{0} <{1}>".format(self.name, self.github_page)


class Genre(models.Model):

    name = models.CharField(
        _('Name'),
        max_length=100,
        help_text=('Name of game genre.')
    )

    description = models.TextField(
        _('Description'),
        validators=[
            MinLengthValidator(MIN_GENRE_DESCRIPTION,
                               _('A genre description must have ' +
                                 'at least 20 characters!'))],
        help_text=_('Describe the genre.'),
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Genre, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Information(models.Model):

    description = models.TextField(
        _('Description'),
        validators=[
            MinLengthValidator(MIN_DESCRIPTION,
                               _('A game description must have ' +
                                 'at least 50 characters!'))],
        help_text=_('Describe the game.'),
    )

    launch_year = models.PositiveIntegerField(
        _('Launch Year'),
        validators=min_max_validators(**years_validator('game')),
        help_text=_('Which was the year the game was launched?'),
    )

    semester = models.PositiveIntegerField(
        _('Semester'),
        validators=min_max_validators(
            (MIN_SEMESTER_VALUE, MAX_SEMESTER_VALUE),
            (_("The semester can't be lower than 1"),
             _("The semester can't be higher than 2"))
        ),
        help_text=_('Which was the semester the game was launched?'),
        choices=[(1, _('1')), (2, _('2'))],
        default=1
    )

    game = models.OneToOneField(
        Game,
        on_delete=models.CASCADE,
        primary_key=True,
    )

    developers = models.ManyToManyField(
        Developer,
        related_name='developers'
    )

    genres = models.ManyToManyField(
        Genre,
        related_name='genres'
    )

    awards = models.ManyToManyField(
        Award,
        related_name='awards',
        blank=True
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Information, self).save(*args, **kwargs)

    def __str__(self):
        min_value = 50 if MIN_DESCRIPTION > 50 else MIN_DESCRIPTION
        return "{0}'s description: {1}...".format(
            self.game.name,
            self.description[0:min_value]
        )


class Statistic(models.Model):

    downloads_amount = models.BigIntegerField(
        _('Dowloads Amount'),
        help_text=_('Amount of downloads of the game.')
    )

    accesses_amount = models.BigIntegerField(
        _('Accesses Amount'),
        help_text=_('Amount of accesses to the game.')
    )

    def __str__(self):
        return "statistic: {0}".format(self.accesses_amount)
