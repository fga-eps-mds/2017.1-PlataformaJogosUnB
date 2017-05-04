from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
import os


def validate_avatar(avatar):
    extension = os.path.splitext(avatar.name)[1]
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
