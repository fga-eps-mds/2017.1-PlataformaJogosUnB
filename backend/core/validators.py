from django.core.validators import FileExtensionValidator
from django.utils.translation import ugettext_lazy as _

IMAGE_ALLOWED_EXTENSIONS = ['jpg', 'png', 'gif', 'jpeg']

SOUNDTRACK_ALLOWED_EXTENSIONS = ['mp3', 'wma', 'aac', 'ac3', 'wav']

VIDEO_ALLOWED_EXTENSIONS = [
    'mp4',
    'rmvb',
    'mkv',
    'avi',
    'wmv',
    'flv',
    'mpeg'
]

PACKAGE_EXTENSION_ERROR = _(
    'Your package format doesn\'t match the platforms' +
    ' available. Please send a file that matchs the platforms' +
    ' or register the platform you need'
)

VERSION_FORMAT_ERROR = _(
    "The version characters can only be either a '.' or a digit " +
    "and can't have 2 followed '.'. Error at: % (version)s"
)


def get_valid_extensions_text(allowed_extensions):
    text = ""
    if not len(allowed_extensions):
        text = 'There are no valid extensions'
    else:
        text = (
            'Accepted formats: ' +
            ', '.join(allowed_extensions[:-1]) +
            ' and ' +
            allowed_extensions[-1]
        )

    return text


HELP_TEXT_IMAGES = get_valid_extensions_text(
    IMAGE_ALLOWED_EXTENSIONS
)


HELP_TEXT_VIDEO = get_valid_extensions_text(
    VIDEO_ALLOWED_EXTENSIONS
)


HELP_TEXT_SOUNDTRACK = get_valid_extensions_text(
    SOUNDTRACK_ALLOWED_EXTENSIONS
)


def image_extension_validator(image):
    validator = FileExtensionValidator(
        allowed_extensions=IMAGE_ALLOWED_EXTENSIONS
    )
    validator(image)
