from media.utils import image_attribute_resize
import pytest


class TestImageAttributeRezise:

    @pytest.fixture
    def file_dependency(self):
        return image_attribute_resize('image', 100, 200)

    def test_should_process(self, file_dependency):
        assert file_dependency.should_process()

    def test_file_name(self, file_dependency):
        assert file_dependency._attname == "image"

    def test_processor_format(self, file_dependency):
        assert file_dependency._processor.get_ext() == '.jpg'

    def test_processor_params(self, file_dependency):
        expected_params = {
            'scale': {
                'max_width': 100,
                'max_height': 200
            },
            'format': 'JPEG'
        }
        assert file_dependency._processor.default_params == expected_params
