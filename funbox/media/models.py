from django.utils.translation import ugettext_lazy as _
from django.db import models
from game.models import Game
from media.choices import ROLE_CHOICES
import os


class Media(models.Model):

    class Meta:
        abstract = True

    game = models.ForeignKey(
        Game,
        related_name='media_%(class)s',
    )

    role = models.CharField(
        _('Role'),
        max_length=10,
        choices=ROLE_CHOICES,
        null=False,
        blank=False,
        default=ROLE_CHOICES[0][0],
        help_text=_('Select the role of this media'),
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Media, self).save(*args, **kwargs)

    def __str__(self):
        return 'file = "{0}", game = {1}'.format(
                os.path.basename(self.file.path),
                self.game.name
        )


class Image(Media):

    image = models.ImageField(
        _('Image'),
        upload_to='images/',
        null=False,
        blank=False,
        help_text=_('Accepted formats: png, jpg, jpeg, etc.')
    )

    def __str__(self):
        return 'file = "{0}", game = {1}'.format(
                os.path.basename(self.image.path),
                self.game.name
        )


class Video(Media):

    video = models.FileField(
        _('Video'),
        upload_to='videos/',
        null=False,
        blank=True,
        help_text=_('Accepted formats: mp4, avi, rmvb, etc.')
    )


class Soundtrack(Media):

    soundtrack = models.FileField(
        _('Soundtrack'),
        upload_to='soundtrack/',
        null=False,
        blank=True,
        help_text=_('Accepted formats: mp3, tar.gz, zip, etc')
    )
