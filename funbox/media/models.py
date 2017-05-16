from django.utils.translation import ugettext_lazy as _
from django.db import models
from django.dispatch import receiver
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
        default=ROLE_CHOICES[0][0],
        help_text=_('Select the role of this media'),
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

    video = models.FileField(
        _('Video'),
        upload_to='videos/',
        help_text=_('Accepted formats: mp4, avi, rmvb, etc.')
    )

    def __str__(self):
        return self.config__str__('video')


class Soundtrack(Media):

    soundtrack = models.FileField(
        _('Soundtrack'),
        upload_to='soundtrack/',
        help_text=_('Accepted formats: mp3, tar.gz, zip, etc')
    )

    def __str__(self):
        return self.config__str__('soundtrack')

@receiver(models.signals.post_delete, sender=Soundtrack)
def auto_delete_soundtrack_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `Soundtrack` object is deleted.
    """
    if instance.soundtrack:
        if os.path.isfile(instance.soundtrack.path):
            os.remove(instance.soundtrack.path)

@receiver(models.signals.pre_save, sender=Soundtrack)
def auto_delete_soundtrack_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `Soundtrack` object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_file = Soundtrack.objects.get(pk=instance.pk).soundtrack
    except Soundtrack.DoesNotExist:
        return False

    new_file = instance.soundtrack
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)

@receiver(models.signals.post_delete, sender=Image)
def auto_delete_image_on_delete(sender, instance, **kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)

@receiver(models.signals.pre_save, sender=Image)
def auto_delete_image_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `Image` object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_file = Image.objects.get(pk=instance.pk).image
    except Image.DoesNotExist:
        return False

    new_file = instance.image
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)

@receiver(models.signals.post_delete, sender=Video)
def auto_delete_video_on_delete(sender, instance, **kwargs):
    if instance.video:
        if os.path.isfile(instance.video.path):
            os.remove(instance.video.path)

@receiver(models.signals.pre_save, sender=Video)
def auto_delete_video_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False
    try:
        old_file = Video.objects.get(pk=instance.pk).video
    except Video.DoesNotExist:
        return False
    new_file = instance.video
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)
