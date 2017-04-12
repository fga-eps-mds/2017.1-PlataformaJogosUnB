# Helper methods to execute tests
import pytest

def validation_test(model, errors_dict):
    from django.core.exceptions import ValidationError
    with pytest.raises(ValidationError)as validation_error:
        model.save()
    assert validation_error.value.message_dict == errors_dict

def mount_error_dict(keys, values):
    return dict([x for x in zip(keys, values)])
