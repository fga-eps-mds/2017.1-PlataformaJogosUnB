from django.utils.translation import ugettext_lazy as _
from django.db import models
from smartfields import fields
from game.models import Game
from media.choices import ROLE_CHOICES
from media.utils import image_attribute_resize
import core.validators as general_validators
import media.validators as validators
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
        default=ROLE_CHOICES[0][0],
        help_text=_('Select the role of this media'),
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Media, self).save(*args, **kwargs)

    def __config_str__(self, attr_name):
        return 'file = "{0}", game = {1}'.format(
            os.path.basename(
                getattr(self, attr_name).path
            ),
            self.game.name
        )


class Image(Media):

    image = fields.ImageField(
        _('Image'),
        validators=[general_validators.image_extension_validator],
        upload_to='images/',
        help_text=_(
            'Images for the game. ' +
            general_validators.HELP_TEXT_IMAGES
        ),
        dependencies=[image_attribute_resize("slide", 1920, 1080)]
    )
    slide = fields.ImageField(blank=True)

    def __str__(self):
        if self.image:
            return self.__config_str__('image')
        else:
            return 'Image has been deleted!'


class Video(Media):

    video = fields.FileField(
        _('Video'),
        upload_to='videos/',
        validators=[validators.video_extension_validator],
        help_text=_(
            'Videos for the game. ' +
            general_validators.HELP_TEXT_VIDEO
        )
    )

    def __str__(self):
        if self.video:
            return self.__config_str__('video')

        else:
            return 'Video has been deleted!'


class Soundtrack(Media):

    soundtrack = fields.FileField(
        _('Soundtrack'),
        upload_to='sounds/',
        validators=[validators.soundtrack_extension_validator],
        help_text=_(
            'Soundtracks for the game. ' +
            general_validators.HELP_TEXT_SOUNDTRACK
        )
    )

    def __str__(self):
        if self.soundtrack:
            return self.__config_str__('soundtrack')

        else:
            return 'Soundtrack has been deleted!'
