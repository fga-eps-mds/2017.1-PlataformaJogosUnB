import pytest
# from game.factory import GameFactory
from media.forms import ImageForm, SoundtrackForm, VideoForm


class TestMediaForm:
    """Uses one of subclass of MediaForm"""

    forms = [(ImageForm()), (SoundtrackForm()), (VideoForm())]

    @pytest.mark.parametrize("form", forms)
    @pytest.mark.parametrize("obj, change", [
        (None, True),
        (object(), False)
    ])
    def test_update_medias_skip(self, form, obj, change):
        list_files = [1, 2, 3]
        update_method = form.update_medias(obj, list_files, change, '')
        assert update_method == list_files

    @pytest.mark.parametrize("form", forms)
    def test_update_medias(self, form, mock):
        cleaned_data = mock.patch("django.forms.ModelForm")
        cleaned_data.return_value = {}
        print(form.cleaned_data())
