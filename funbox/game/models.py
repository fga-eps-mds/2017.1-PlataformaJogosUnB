from django.db import models
from django.utils.translation import ugettext_lazy as _
from game.validators import validate_version
from information.models import Information


class Game(models.Model):

    name = models.CharField(
        _('Name'),
        max_length=100,
        null=False,
        blank=False,
        help_text=_("What's the name of the game?")
    )

    game_version = models.CharField(
        _('Game Version'),
        max_length=20,
        validators=[validate_version],
        null=True,
        blank=True,
        help_text=_("What's the game version?")
    )

    official_repository = models.URLField(
        _('Official Repository'),
        null=False,
        blank=False,
        help_text=_("What's the game's official repository?")
    )

    information = models.OneToOneField(
        Information
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Game, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
