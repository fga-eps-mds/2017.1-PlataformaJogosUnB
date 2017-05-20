from django.core.validators import FileExtensionValidator
import core.validators as general_validators


def video_extension_validator(video):
    validator = FileExtensionValidator(
        allowed_extensions=general_validators.VIDEO_ALLOWED_EXTENSIONS
    )
    validator(video)


def soundtrack_extension_validator(soundtrack):
    validator = FileExtensionValidator(
        allowed_extensions=general_validators.SOUNDTRACK_ALLOWED_EXTENSIONS
    )
    validator(soundtrack)
