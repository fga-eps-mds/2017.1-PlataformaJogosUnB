from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from core.validators import (
    PACKAGE_EXTENSION_ERROR,
    VERSION_FORMAT_ERROR
)
import game.models
from django.utils.translation import ugettext_lazy as _
from django.template.defaultfilters import filesizeformat
import re


def validate_version(version):
    version_pattern = '^(\d+\.)*\d+$'
    if re.match(version_pattern, version) is None:
        raise ValidationError(
            VERSION_FORMAT_ERROR,
            params={'version': version}
        )


def package_extension_validator(package):
    validator = FileExtensionValidator(
        game.models.Platform.get_platform_extensions(),
        PACKAGE_EXTENSION_ERROR
    )
    validator(package)


def _get_size(package):
    return package.size


def validate_package_size(package):
    KILOBYTE = 1024
    MAX_UPLOAD_SIZE = 1 * KILOBYTE ** 3
    if(_get_size(package) > MAX_UPLOAD_SIZE):
        raise ValidationError(
            _('Please keep filesize under %s. Current filesize %s')
            % (filesizeformat(MAX_UPLOAD_SIZE), filesizeformat(package.size))
        )
