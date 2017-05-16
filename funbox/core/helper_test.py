# Helper methods to execute tests
import pytest
from enum import Enum


def validation_test(model, errors_dict):
    """ This method is used to assist in the validation of the attributes of a
    Model class. In operation, a model is expected to generate an exception in
    the e executing to save method of the model.

    :param model: object to be validated
    :param errors_dict: dictionary with validation errors
    """
    from django.core.exceptions import ValidationError
    with pytest.raises(ValidationError) as validation_error:
        model.save()
    print(validation_error.value.message_dict)
    assert validation_error.value.message_dict == errors_dict


def mount_error_dict(keys, values):
    """ This method is used to join the keys and values in a dictionary.

    :param keys: array with the names of attributes [key1, key2]
    :param values: values of error messages [[message_key1], [message_key2]]
    """
    return dict([x for x in zip(keys, values)])


class ErrorMessage(Enum):
    YEAR_PAST = 'Our University had not been built at this time!'
    NULL = 'Este campo não pode ser nulo.'
    BLANK = "Este campo não pode estar vazio."
    NOT_INTEGER = "'' valor deve ser um inteiro."

    def __eq__(self, other_object):
        return self.value == other_object
