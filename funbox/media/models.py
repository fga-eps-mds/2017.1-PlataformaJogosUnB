from django.db import models
from django.utils.translation import ugettext_lazy as _


class Media(models.Model):

    image = models.ImageField(
                                _('Image'),
                                upload_to = 'public/image/',
                                default = 'public/image/no-img.jpg',
                                null=False,
                                blank=True,
                                help_text=_('image of game')
    )

    video = models.FileField(upload_to = 'public/video/',
                                null = False,
                                blank=True,
                                help_text=_('video of game')
    )





