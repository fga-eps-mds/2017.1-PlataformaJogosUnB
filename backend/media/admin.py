from media.models import Image, Video, Soundtrack
from django.contrib import admin
from media.forms import ImageForm, VideoForm, SoundtrackForm


class ImageAdmin(admin.ModelAdmin):
    form = ImageForm

    def save_model(self, request, obj, form, change):
        list_images = request.FILES.getlist('image')
        form.save_instances(list_images, obj, change) 


class VideoAdmin(admin.ModelAdmin):
    form = VideoForm

    def save_model(self, request, obj, form, change):
        list_videos = request.FILES.getlist('video')
        form.save_instances(list_videos, obj, change)


class SoundtrackAdmin(admin.ModelAdmin):
    form = SoundtrackForm

    def save_model(self, request, obj, form, change):
        list_soundtrack = request.FILES.getlist('soundtrack')
        form.save_instances(list_soundtrack, obj, change)


admin.site.register(Image, ImageAdmin)
admin.site.register(Video, VideoAdmin)
admin.site.register(Soundtrack, SoundtrackAdmin)
