from django.core.validators import FileExtensionValidator


def video_extension_validator(video):
    validator = FileExtensionValidator(
        allowed_extensions=[
            'mp4',
            'rmvb',
            'mkv',
            'avi',
            'wmv',
            'flv',
            'mpeg'
        ]
    )
    validator(video)


def soundtrack_extension_validator(soundtrack):
    validator = FileExtensionValidator(
        allowed_extensions=['mp3', 'wma', 'aac', 'ac3', 'wav']
    )
    validator(soundtrack)
