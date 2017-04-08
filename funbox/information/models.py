from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinValueValidator


class Information(models.Model):

    description = models.TextField(
        _('Description'),
        max_length=1000,
        null=False,
        blank=False,
        help_text=_("Describe your game.")
    )

    launch_year = models.PositiveInteger(
        _('Launch year'),
        max_length=4,
        null=False,
        blank=False,
        help_text=_("Which was the year the game was launched?")
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Information, self).save(*args, **kwargs)


class Statistic(models.Model):

    download_amount = models.BigIntegerField(
        _('Dowload amount'),
        null=False,
        blank=False,
        help_text=_("Game amount of downloads")
    )

    access_amount = models.BigIntegerField(
        _('Access amount'),
        null=False,
        blank=False,
        help_text=_("Game amount of access")
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Statistic, self).save(*args, **kwargs)


class Award(models.Model):

    name = models.CharField(
        _('Name'),
        max_length=100,
        null=False,
        blank=False,
        help_text=_("Name of the award")
    )

    year = models.PositiveInteger(
        _('Year'),
        max_length=4,
        null=False,
        blank=False,
        help_text=_("Year of the ward")
    )

    place = models.CharField(
        _('Place'),
        max_length=100,
        null=False,
        blank=False,
        help_text=_("Place whose game won the award")
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Award, self).save(*args, **kwargs)
