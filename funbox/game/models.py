from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _
from django.core.validators import URLValidator
from game.validators import validate_version


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

    @receiver(post_delete, sender='game.Game')
    def post_delete_information(sender, instance, *args, **kwargs):
        if instance.information:
            instance.information.delete()

    def __str__(self):
        pass
        return "%s v%s" % (self.name, self.game_version)
