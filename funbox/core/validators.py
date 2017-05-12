from django.core.validators import FileExtensionValidator

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


def get_valid_extensions_text(allowed_extensions):
    if len(allowed_extensions):
        return (
            'Accepted formats: ' +
            ', '.join(allowed_extensions[:-1]) +
            ' and ' +
            allowed_extensions[-1]
        )
    else:
        return 'There are no valid extensions'


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
