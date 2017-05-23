from django.utils.translation import ugettext_lazy as _
from django.db import models
# from django.dispatch import receiver
from smartfields import fields
from game.models import Game
from media.choices import ROLE_CHOICES
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

    def config__str__(self, attr_name):
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
        )
    )

    def __str__(self):
        if self.image:
            return 'file = "{0}", game = {1}'.format(
                os.path.basename(self.image.path),
                self.game.name
            )
        else:
            return 'Image deleted!'


class Video(Media):

    video = models.FileField(
        _('Video'),
        upload_to='videos/',
        validators=[validators.video_extension_validator],
        help_text=_(
            'Videos for the game. ' +
            general_validators.HELP_TEXT_VIDEO
        )
    )

    def __str__(self):
        return self.config__str__('video')


class Soundtrack(Media):

    soundtrack = models.FileField(
        _('Soundtrack'),
        upload_to='sounds/',
        validators=[validators.soundtrack_extension_validator],
        help_text=_(
            'Soundtracks for the game. ' +
            general_validators.HELP_TEXT_SOUNDTRACK
        )
    )

    def __str__(self):
        return self.config__str__('soundtrack')


# @receiver(models.signals.post_delete, sender=Soundtrack)
# def auto_delete_soundtrack_on_delete(sender, instance, **kwargs):
#     """
#     Deletes file from filesystem
#     when corresponding `Soundtrack` object is deleted.
#     """
#     if instance.soundtrack:
#         if os.path.isfile(instance.soundtrack.path):
#             os.remove(instance.soundtrack.path)


# @receiver(models.signals.pre_save, sender=Soundtrack)
# def auto_delete_soundtrack_on_change(sender, instance, **kwargs):
#     """
#     Deletes old file from filesystem
#     when corresponding `Soundtrack` object is updated
#     with new file.
#     """
#     if not instance.pk:
#         return False

#     try:
#         old_file = Soundtrack.objects.get(pk=instance.pk).soundtrack
#     except Soundtrack.DoesNotExist:
#         return False

#     new_file = instance.soundtrack
#     if not old_file == new_file:
#         if os.path.isfile(old_file.path):
#             os.remove(old_file.path)

# @receiver(models.signals.post_delete, sender=Video)
# def auto_delete_video_on_delete(sender, instance, **kwargs):
#     if instance.video:
#         if os.path.isfile(instance.video.path):
#             os.remove(instance.video.path)


# @receiver(models.signals.pre_save, sender=Video)
# def auto_delete_video_on_change(sender, instance, **kwargs):
#     if not instance.pk:
#         return False
#     try:
#         old_file = Video.objects.get(pk=instance.pk).video
#     except Video.DoesNotExist:
#         return False
#     new_file = instance.video
#     if not old_file == new_file:
#         if os.path.isfile(old_file.path):
#             os.remove(old_file.path)
