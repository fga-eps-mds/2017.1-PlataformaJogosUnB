from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinValueValidator
from django.core.validators import MaxValueValidator
from django.core.validators import MinLengthValidator
from django.core.validators import EmailValidator
from django.core.validators import URLValidator
from django.db import models
import datetime

UNB_CREATION = 1962


class Information(models.Model):

    description = models.TextField(
        _('Description'),
        max_length=1000,
        validators=[
            MinLengthValidator(50,
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

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Information, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Statistic(models.Model):

    information = models.ForeignKey(
        Information
    )

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
        return self.name


class Award(models.Model):

    name = models.CharField(
        _('Name'),
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
                    MaxValueValidator(datetime.datetime.now(),
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
        return self.name


class Developer(models.Model):

    name = models.CharField(
        _('Name'),
        max_length=100,
        null=False,
        blank=False,
        help_text=_('Name of the developer.')
    )

    avatar = models.FileField(
        _('Image'),
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
        return self.name
