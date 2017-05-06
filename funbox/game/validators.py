from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
import re


def validate_version(version):
    version_pattern = '^(\d+\.)*\d+$'
    if re.match(version_pattern, version) is None:
        raise ValidationError(
            _("The version characters can only be either a '.' or a digit " +
              "and can't have 2 followed '.'. Error at: % (version)s"),
            params={'version': version},
        )
