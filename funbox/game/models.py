from django.db import models
from django.utils.translation import ugettext_lazy as _
# from information.models import Information
from game.validators import validate_version
from django.core.validators import URLValidator


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

    # information = models.OneToOneField(
    #     Information,
    #     on_delete=models.CASCADE,
    #     primary_key=True
    # )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Game, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
