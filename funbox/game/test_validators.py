from game.validators import validate_version
from django.core.exceptions import ValidationError
import pytest


class TestValidateVersion:
    @pytest.mark.parametrize("version", ["2", "20", "2.0", "20.0", "2.01",
                                         "20.01", "2.2.2", "20.0.20", "0.0.1"])
    def test_valid_versions(self, version):
        assert validate_version(version) is None
    error_message = "The version characters can only be either a '.' " \
                    "or a digit and can't have 2 followed '.'. Error at: "\
                    "% (version)s"

    @pytest.mark.parametrize("version", ["v2", "v2.0", "2.0v", "v2a", "2a",
                                         "a", ".2", "2..2", "20..2", "2.",
                                         "2.2.", "v.2"])
    def test_invalid_Version(self, version):
        with pytest.raises(ValidationError) as validation_error:
            validate_version(version)
        assert validation_error.value.params == {'version': version}
        assert self.error_message == str(validation_error.value.message)
