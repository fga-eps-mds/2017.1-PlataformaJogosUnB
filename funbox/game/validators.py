from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
from django.template.defaultfilters import filesizeformat
import re


def validate_version(version):
    version_pattern = '^(\d+\.)*\d+$'
    if re.match(version_pattern, version) is None:
        raise ValidationError(
            _("The version characters can only be either a '.' or a digit " +
              "and can't have 2 followed '.'. Error at: % (version)s"),
            params={'version': version},
        )


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
