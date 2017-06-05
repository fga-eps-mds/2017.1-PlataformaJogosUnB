import pytest
from game.factory import GameFactory
from media.factory import ImageFactory, VideoFactory, SoundtrackFactory
from media.forms import ImageForm, SoundtrackForm, VideoForm


class TestMediaForm:
    """Uses one of subclass of MediaForm"""

    @pytest.mark.parametrize("form", [
        (ImageForm()),
        (SoundtrackForm()),
        (VideoForm())
    ])
    @pytest.mark.parametrize("obj, change", [
        (None, True),
        (object(), False)
    ])
    def test_update_medias_skip(self, form, obj, change):
        list_files = [1, 2, 3]
        update_method = form.update_medias(obj, list_files, change, '')
        assert update_method == list_files

    @pytest.mark.parametrize("form, media, attr", [
        (ImageForm(), ImageFactory.build(), "image"),
        (SoundtrackForm(), SoundtrackFactory.build(), "soundtrack"),
        (VideoForm(), VideoFactory.build(), "video")
    ])
    @pytest.mark.django_db
    def test_update_medias(self, form, media, attr):
        form.cleaned_data = {'game': GameFactory(), 'role': 'slider'}
        list_files = [getattr(media, attr).file]
        assert [] == form.update_medias(media, list_files, True, attr)
        assert media.__class__.objects.count() == 1

    @pytest.mark.django_db
    @pytest.mark.parametrize("form, attr, factory", [
        (ImageForm(), "image", ImageFactory.build()),
        (SoundtrackForm(), "soundtrack", SoundtrackFactory.build()),
        (VideoForm(), "video", VideoFactory.build())
    ])
    def test_save_instances(self, form, attr, factory, mock):
        form.cleaned_data = {'game': GameFactory(), 'role': 'slider'}
        list_files = [getattr(factory, attr).file]
        with mock.patch("media.forms.MediaForm.update_medias",
                        return_value=list_files):
            form.save_instances(list_files, factory, False, attr)
            assert factory.__class__.objects.count() == 1
