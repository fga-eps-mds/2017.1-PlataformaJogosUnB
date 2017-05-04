from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
import os


def validate_image(image):
    extension = os.path.splitext(image.name)[1]
    valid_extensions = [
        '.png',
        '.jpg',
        '.gif',
        '.jpeg',
    ]

    if not extension.lower() in valid_extensions:
        raise ValidationError(
            _('Invalid image format.' +
              ' Please insert an image with a valid extension')
        )


def validate_video(video):
    extension = os.path.splitext(video.name)[1]
    valid_extensions = [
        '.mp4',
        '.rmvb',
        '.mkv',
        '.avi',
        '.wmv',
        '.flv',
        '.mpeg',
    ]

    if not extension.lower() in valid_extensions:
        raise ValidationError(
            _('Invalid video format.' +
              ' Please insert a video with a valid extension')
        )


def validate_soundtrack(soundtrack):
    extension = os.path.splitext(soundtrack.name)[1]
    valid_extensions = [
        '.mp3',
        '.wma',
        '.aac',
        '.ac3',
        '.wav',
    ]

    if not extension.lower() in valid_extensions:
        raise ValidationError(
            _('Invalid video format.' +
              ' Please insert a video with a valid extension')
        )
