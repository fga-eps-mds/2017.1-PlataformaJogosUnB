from django.utils.translation import ugettext_lazy as _
from django.db import models
from game.models import Game


class Media(models.Model):

    image = models.ImageField(
        _('Image'),
        upload_to='public/images/',
        null=False,
        blank=True,
        help_text=_('png, jpg, jpeg, etc.')
    )

    video = models.FileField(
        _('Video'),
        upload_to='public/videos/',
        null=False,
        blank=True,
        help_text=_('mp4, avi, rmvb, etc.')
    )

    soundtrack = models.FileField(
        _('Soundtrack'),
        upload_to='public/soundtrack/',
        null=False,
        blank=True,
        help_text=_('mp3, tar.gz, zip, etc')
    )

    game = models.OneToOneField(
        Game,
        on_delete=models.CASCADE,
        related_name='game',
        primary_key=True,
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Media, self).save(*args, **kwargs)

    def __str__(self):
        return "%s's media" % (self.information.game.name)
