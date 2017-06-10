from game.validators import validate_version, validate_package_size
from django.core.exceptions import ValidationError
from game.factory import PackageFactory, PlatformFactory
from unittest.mock import patch
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


class TestSize:

    @pytest.mark.django_db
    def test_size_validation(self):
        error_message = "Please keep filesize under 1,0 GB. " \
                        "Current filesize 10 bytes"
        PlatformFactory()
        package_package = PackageFactory().package
        package = patch("game.validators._get_size", return_value=1 + 1024**3)
        package.start()
        with pytest.raises(ValidationError) as validation_error:
            validate_package_size(package_package)
        assert validation_error.value.message == error_message
        package.stop()
