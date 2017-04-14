from django.db import models
from django.utils.translation import ugettext_lazy as _


class Media(models.Model):

    image = models.FileField(
        _('Image'),
        null=False,
        blank=True,
        help_text=_('image of game')
    )

    video = models.FileField(
        _('Video'),
        null=False,
        blank=True,
        help_text=_('video of game')
    )
