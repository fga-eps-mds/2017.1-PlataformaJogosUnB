from media.models import Image, Video, Soundtrack
from django.contrib import admin
from media.forms import ImageForm, VideoForm, SoundtrackForm


class ImageAdmin(admin.ModelAdmin):
    form = ImageForm


class VideoAdmin(admin.ModelAdmin):
    form = VideoForm


class SoundtrackAdmin(admin.ModelAdmin):
    form = SoundtrackForm

admin.site.register(Image, ImageAdmin)
admin.site.register(Video, VideoAdmin)
admin.site.register(Soundtrack, SoundtrackAdmin)
