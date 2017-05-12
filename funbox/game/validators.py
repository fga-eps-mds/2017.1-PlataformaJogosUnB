from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
from django.core.validators import FileExtensionValidator
import game.models
import re


def validate_version(version):
    version_pattern = '^(\d+\.)*\d+$'
    if re.match(version_pattern, version) is None:
        raise ValidationError(
            _("The version characters can only be either a '.' or a digit " +
              "and can't have 2 followed '.'. Error at: % (version)s"),
            params={'version': version},
        )


def package_extension_validator(package):
    validator = FileExtensionValidator(
        get_valid_package_extensions(),
        _('Your package format doesn\'t match the platforms' +
          ' available. Please send a file that matchs the platforms' +
          ' or register the platform you need')
    )
    validator(package)


def get_valid_package_extensions():
    return [
        platform.extensions for platform in game.models.Platform.objects.all()
    ]
