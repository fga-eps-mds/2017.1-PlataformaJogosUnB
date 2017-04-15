from django.utils.translation import ugettext_lazy as _
from django.db import models
from game.models import Game


class Media(models.Model):

    class Meta:
        abstract = True

    game = models.ForeignKey(
        Game,
        related_name='media_%(class)s',
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Media, self).save(*args, **kwargs)

    def __str__(self):
        return "%s's media" % (self.game.name)


class Image(Media):

    image = models.ImageField(
        _('Image'),
        upload_to='public/images/',
        null=False,
        blank=True,
        help_text=_('Accepted formats: png, jpg, jpeg, etc.')
    )


class Video(Media):

    video = models.FileField(
        _('Video'),
        upload_to='public/videos/',
        null=False,
        blank=True,
        help_text=_('Accepted formats: mp4, avi, rmvb, etc.')
    )


class Soundtrack(Media):

    soundtrack = models.FileField(
        _('Soundtrack'),
        upload_to='public/soundtrack/',
        null=False,
        blank=True,
        help_text=_('Accepted formats: mp3, tar.gz, zip, etc')
    )
