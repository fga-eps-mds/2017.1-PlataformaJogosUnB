from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from core.validators import (
    PACKAGE_EXTENSION_ERROR,
    VERSION_FORMAT_ERROR
)
import game.models
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
