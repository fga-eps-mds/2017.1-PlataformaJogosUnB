from django.db import models
from django.utils.translation import ugettext_lazy as _


class Information(models.Model):
    description = models.TextField(
        _('Description'),
        max_length=1000,
        null=False,
        blank=False,
        help_text=_("Describe your game.")
    )

    launch_year = models.IntegerField(
        _('Launch year'),
        null=False,
        blank=False,
        help_text=_("Which was the year the game was launched?")
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Information, self).save(*args, **kwargs)
