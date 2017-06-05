import pytest
from media.factory import ImageFactory, VideoFactory, SoundtrackFactory
from django.contrib.admin.sites import AdminSite
from media.admin import ImageAdmin, VideoAdmin, SoundtrackAdmin
from media.models import Image, Video, Soundtrack
from media.forms import ImageForm, VideoForm, SoundtrackForm
from unittest import mock


class TestAdminMedia:

    data = {
        'image': ImageFactory.build().image.file,
        'video': VideoFactory.build().video.file,
        'soundtrack': SoundtrackFactory.build().soundtrack.file
    }

    def setup_method(self, method):
        class MockRequest:

            class FILES:

                @classmethod
                def getlist(cls, attr):
                    return TestAdminMedia.data[attr]

        self.site = AdminSite()
        self.request = MockRequest

    @pytest.mark.parametrize("admin, form, factory, model, attr", [
        (ImageAdmin, ImageForm, ImageFactory, Image, "image"),
        (SoundtrackAdmin, SoundtrackForm, SoundtrackFactory,
         Soundtrack, "soundtrack"),
        (VideoAdmin, VideoForm, VideoFactory, Video, "video")
    ])
    def test_save_model(self, admin, form, factory, model, attr):
        with mock.patch("media.forms.MediaForm.save_instances") as m:
            mediaAdmin = admin(model, self.site)
            args = [factory.build(), form()]
            mediaAdmin.save_model(self.request, args[0], args[1], True)
            m.assert_called_once_with(TestAdminMedia.data[attr],
                                      args[0], True, attr)
