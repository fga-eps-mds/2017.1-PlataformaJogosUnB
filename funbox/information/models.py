from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinValueValidator
from django.core.validators import MaxValueValidator
from django.core.validators import MinLengthValidator
from django.core.validators import EmailValidator
from django.core.validators import URLValidator
from django.db import models
from game.models import Game
import datetime

UNB_CREATION = 1962
MIN_DESCRIPTION = 50


class Award(models.Model):

    name = models.CharField(
        _('Award name'),
        max_length=100,
        null=False,
        blank=False,
        help_text=_('Name of the award.')
    )

    year = models.PositiveIntegerField(
        _('Year'),
        validators=[MinValueValidator(UNB_CREATION,
                                      _('Our University had ' +
                                        'not been built at this time!')),
                    MaxValueValidator(int(datetime.datetime.now().year),
                                      _('We believe the award ' +
                                        'was not won in the future!'))],


        null=False,
        blank=False,
        help_text=_('Year the award was won.')
    )

    place = models.CharField(
        _('Place'),
        max_length=100,
        null=False,
        blank=False,
        help_text=_('Place where the game won the award.')
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Award, self).save(*args, **kwargs)

    def __str__(self):
        return "Award (%d): %s" % (self.year, self.name)


class Developer(models.Model):

    name = models.CharField(
        _('Name'),
        max_length=100,
        null=False,
        blank=False,
        help_text=_('Name of the developer.')
    )

    avatar = models.FileField(
        _('Avatar'),
        null=False,
        blank=True,
        help_text=_('Developer image.')
    )

    login = models.CharField(
        _('Login'),
        max_length=50,
        null=False,
        blank=False,
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
        null=False,
        blank=False,
        help_text=_('Developer Github page.')
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Developer, self).save(*args, **kwargs)

    def __str__(self):
        return "%s <%s>" % (self.name, self.github_page)


class Information(models.Model):

    description = models.TextField(
        _('Description'),
        validators=[
            MinLengthValidator(MIN_DESCRIPTION,
                               _('A game description must have ' +
                                 'at least 50 characters!'))],
        null=False,
        blank=False,
        help_text=_('Describe the game.'),
    )

    launch_year = models.PositiveIntegerField(
        _('Launch Year'),
        validators=[MinValueValidator(UNB_CREATION,
                                      _('Our University had not ' +
                                        'been built at this time!')),
                    MaxValueValidator(int(datetime.datetime.now().year),
                                      _('We believe the game ' +
                                        'did not come from future!'))],
        null=False,
        blank=False,
        help_text=_('Which was the year the game was launched?'),
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
        return "Information description: %s..." % self.description[0:min_value]


class Statistic(models.Model):

    downloads_amount = models.BigIntegerField(
        _('Dowloads Amount'),
        null=False,
        blank=False,
        help_text=_('Amount of downloads of the game.')
    )

    accesses_amount = models.BigIntegerField(
        _('Accesses Amount'),
        null=False,
        blank=False,
        help_text=_('Amount of accesses to the game.')
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Statistic, self).save(*args, **kwargs)

    def __str__(self):
        return "statistic: %d" % self.accesses_amount
