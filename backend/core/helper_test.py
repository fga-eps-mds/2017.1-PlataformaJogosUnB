# Helper methods to execute tests
import pytest
from enum import Enum
from django.core.exceptions import ValidationError
from core.validators import (
    IMAGE_ALLOWED_EXTENSIONS,
    VIDEO_ALLOWED_EXTENSIONS,
    SOUNDTRACK_ALLOWED_EXTENSIONS,
)
from django.db import models


def validation_test(model, errors_dict):
    """ This method is used to assist in the validation of the attributes of a
    Model class. In operation, a model is expected to generate an exception in
    the e executing to save method of the model.

    :param model: object to be validated
    :param errors_dict: dictionary with validation errors
    """
    with pytest.raises(ValidationError) as validation_error:
        model.save()
    assert validation_error.value.message_dict == errors_dict


def mount_error_dict(keys, values):
    """ This method is used to join the keys and values in a dictionary.
        Each field is a key that is associated to a list of error messages

    :param keys: array with the names of attributes [key1, key2]
    :param values: values of error messages [[message_key1], [message_key2]]
    """
    return dict(zip(keys, values))


def get_file_extension_message(extension, allowed_extensions):
    return (
        "A extensão de arquivo '{}' não é permitida." +
        " As extensões permitidas são: '{}"
    ).format(extension, allowed_extensions)


MEDIA_ALLOWED_EXTENSIONS = {
    "image": IMAGE_ALLOWED_EXTENSIONS,
    "video": VIDEO_ALLOWED_EXTENSIONS,
    "soundtrack": SOUNDTRACK_ALLOWED_EXTENSIONS
}

for key in MEDIA_ALLOWED_EXTENSIONS.keys():
    MEDIA_ALLOWED_EXTENSIONS[key] = ', '.join(
        MEDIA_ALLOWED_EXTENSIONS[key]
    ) + "'."


class ErrorMessage(Enum):

    def get_media_error_extensions():
        media_kind_errors = {
            'image': 'ppm',
            'video': 'jpg',
            'soundtrack': 'mp4'
        }

        media_extensions = {}
        for kind_error in media_kind_errors.items():
            media_extensions[
                kind_error[0]
            ] = get_file_extension_message(
                kind_error[1],
                MEDIA_ALLOWED_EXTENSIONS[kind_error[0]]
            )

        return media_extensions

    def __eq__(self, other_object):
        return self.value == other_object

    YEAR_PAST = 'Our University had not been built at this time!'

    NULL = 'Este campo não pode ser nulo.'

    BLANK = "Este campo não pode estar vazio."

    NOT_INTEGER = "'' valor deve ser um inteiro."

    IMAGE_EXTENSION = get_media_error_extensions()['image']

    VIDEO_EXTENSION = get_media_error_extensions()['video']

    SOUNDTRACK_EXTENSION = get_media_error_extensions()['soundtrack']

    IMAGE_DEFAULT_ALLOWED_EXTENSIONS = ', '.join(
        models.ImageField().validators[0].allowed_extensions
    ) + "'."

    NOT_IMAGE = [
        get_file_extension_message('py', IMAGE_DEFAULT_ALLOWED_EXTENSIONS),
        get_file_extension_message('py', MEDIA_ALLOWED_EXTENSIONS['image'])
    ]

    INVALID_PACKAGE = (
        'Your package format doesn\'t match the platforms' +
        ' available. Please send a file that matchs the platforms' +
        ' or register the platform you need'
    )

    FILE_TOO_BIG = (
        "Please keep filesize under 1,0" +
        "\xa0GB. Current filesize 10\xa0"
        "bytes"
    )
