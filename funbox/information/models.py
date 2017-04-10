from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinValueValidator
# from .models import *


class Information(models.Model):

    description = models.TextField(
        _('Description'),
        max_length=1000,
        null=False,
        blank=False,
        help_text=_("Describe the game.")
    )

    launch_year = models.PositiveIntegerField(
        _('Launch Semester/Year'),
        null=False,
        blank=False,
        help_text=_("Which was the semester/year the game was launched?"),
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Information, self).save(*args, **kwargs)


class Statistic(models.Model):

    information = models.ForeignKey(
        Information
    )

    downloads_amount = models.BigIntegerField(
        _('Dowloads Amount'),
        null=False,
        blank=False,
        help_text=_("Game amount of downloads.")
    )

    accesses_amount = models.BigIntegerField(
        _('Accesses Amount'),
        null=False,
        blank=False,
        help_text=_("Game amount of access.")
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
        help_text=_("Name of the award.")
    )

    year = models.PositiveIntegerField(
        _('Year'),
        null=False,
        blank=False,
        help_text=_("Year the award was won.")
    )

    place = models.CharField(
        _('Place'),
        max_length=100,
        null=False,
        blank=False,
        help_text=_("Place where the game won the award.")
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Award, self).save(*args, **kwargs)


class Developer(models.Model):

    name = models.CharField(
        _('Name'),
        max_length=100,
        null=False,
        blank=False,
        help_text=_("Name of the person who developed the game.")
    )

    avatar = models.FileField(
        _('Image'),
        null=False,
        blank=True,
        help_text=_("Developer image.")
    )

    login = models.CharField(
        _('Login'),
        max_length=50,
        null=False,
        blank=False,
        help_text=_("Developer login for github.")
    )

    email = models.EmailField(
        _('E-mail'),
        max_length=100,
        null=True,
        blank=True,
        help_text=_("Developer e-mail contact.")
    )

    github_page = models.URLField(
        _('Github Page'),
        null=False,
        blank=False,
        help_text=_("Developer Github page.")
    )
