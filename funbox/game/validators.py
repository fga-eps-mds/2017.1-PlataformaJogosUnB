from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
import os
import re


def validate_version(version):
    version_pattern = '^(\d+\.)*\d+$'
    if re.match(version_pattern, version) is None:
        raise ValidationError(
            _("The version characters can only be either a '.' or a digit" +
              "and can't have 2 followed '.'. Error at: % (version)s"),
            params={'version': version},
        )


def validate_icon(icon):
    extension = os.path.splitext(icon.name)[1]
    valid_extensions = [
        '.png',
        '.jpg',
        '.gif',
        '.jpeg',
    ]

    if not extension.lower() in valid_extensions:
        raise ValidationError(
            _('Invalid image format.' +
              'Please insert an image with a valid extension')
        )
