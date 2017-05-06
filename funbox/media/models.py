from django.utils.translation import ugettext_lazy as _
from django.db import models
from game.models import Game
from media.choices import ROLE_CHOICES
from media.choices import IMAGES_ROLE_CHOICES
import django.apps
import os


class Media(models.Model):

    class Meta:
        abstract = True

    game = models.ForeignKey(
        Game,
        related_name='media_%(class)s',
    )

    def save(self, *args, **kwargs):
        super(Media, self).save(*args, **kwargs)

    def config__str__(self, attr_name):
        return 'file = "{0}", game = {1}'.format(
            os.path.basename(
                getattr(self, attr_name).path
            ),
            self.game.name
        )


class Image(Media):

    role = models.CharField(
        _('Role'),
        max_length=10,
        choices=IMAGES_ROLE_CHOICES,
        default=IMAGES_ROLE_CHOICES[0][0],
        help_text=_('Select the role of this media'),
    )

    image = models.ImageField(
        _('Image'),
        upload_to='images/',
        help_text=_('Accepted formats: png, jpg, jpeg, etc.')
    )

    def __str__(self):
        return 'file = "{0}", game = {1}'.format(
            os.path.basename(self.image.path),
            self.game.name
        )


class Video(Media):

    role = models.CharField(
        _('Role'),
        max_length=10,
        choices=ROLE_CHOICES,
        default=ROLE_CHOICES[0][0],
        help_text=_('Select the role of this media'),
    )

    video = models.FileField(
        _('Video'),
        upload_to='videos/',
        help_text=_('Accepted formats: mp4, avi, rmvb, etc.')
    )

    def __str__(self):
        return self.config__str__('video')


class Soundtrack(Media):

    role = models.CharField(
        _('Role'),
        max_length=10,
        choices=ROLE_CHOICES,
        default=ROLE_CHOICES[0][0],
        help_text=_('Select the role of this media'),
    )

    soundtrack = models.FileField(
        _('Soundtrack'),
        upload_to='soundtrack/',
        help_text=_('Accepted formats: mp3, tar.gz, zip, etc')
    )

    def __str__(self):
        return self.config__str__('soundtrack')
