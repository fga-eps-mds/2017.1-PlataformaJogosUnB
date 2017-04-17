from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.validators import URLValidator
from game.validators import validate_version
from game.choices import EXTENSION_CHOICES

KILOBYTE = 1024
# MAX_UPLOAD_SIZE = 1 * KILOBYTE ** 3

# TODO: fix MAX_UPLOAD_SIZE validation - save as a string or define a constant.


class Game(models.Model):

    name = models.CharField(
        _('Game Name'),
        max_length=100,
        null=False,
        blank=False,
        help_text=_('What\'s the name of the game?'),
    )

    game_version = models.CharField(
        _('Game Version'),
        max_length=20,
        validators=[validate_version],
        null=True,
        blank=True,
        help_text=_('What\'s the game version?'),
    )

    official_repository = models.URLField(
        _('Official Repository'),
        validators=[URLValidator()],
        null=False,
        blank=False,
        help_text=_('What is the official repository for this game?'),
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Game, self).save(*args, **kwargs)

    def __str__(self):
        return "{0} V{1}".format(
                self.name,
                self.game_version
        )

    def fetch_media(self, media, role):
        return getattr(self, 'media_' + media).filter(role=role)


class Platform(models.Model):

    name = models.CharField(
        _('Package name'),
        max_length=50,
        null=False,
        blank=False,
        help_text=('Name of the game\'s package'),
    )

    extensions = models.CharField(
        _('Valid extension'),
        max_length=3,
        choices=EXTENSION_CHOICES,
        null=False,
        blank=False,
        help_text=('Select the package extension that will be accepted'),
    )

    platform = models.FileField(
        _('Platform'),
        upload_to='Platform',
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Platform, self).save(*args, **kwargs)


class Package(models.Model):

    package = models.FileField(
        _('Package'),
        upload_to='packages/',
        # max_length=MAX_UPLOAD_SIZE,
        null=False,
        blank=False,
        help_text=('Choose the game\'s package')
    )

    games = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        related_name='packages'
    )

    platform = models.ManyToManyField(
        Platform,
        related_name='platforms'
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Package, self).save(*args, **kwargs)
