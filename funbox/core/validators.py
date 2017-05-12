from django.core.validators import FileExtensionValidator


def image_extension_validator(image):
    validator = FileExtensionValidator(
        allowed_extensions=['jpg', 'png', 'gif', 'jpeg']
    )
    validator(image)
