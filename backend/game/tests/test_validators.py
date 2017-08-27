from game.validators import validate_package_size
from django.core.exceptions import ValidationError
from game.factory import PackageFactory, PlatformFactory
from unittest.mock import patch
import pytest


class TestSize:

    @pytest.mark.django_db
    def test_size_validation(self):
        error_message = "Por favor, mantenha o tamanho do arquivo abaixo de " \
                        "5,0 GB. O atual é 10 bytes"
        PlatformFactory()
        package_package = PackageFactory().package
        pack = patch("game.validators._get_size", return_value=1 + 5 * 1024**3)
        pack.start()
        with pytest.raises(ValidationError) as validation_error:
            validate_package_size(package_package)
        assert validation_error.value.message == error_message
        pack.stop()
