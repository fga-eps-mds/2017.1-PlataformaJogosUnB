from media.models import Image, Video, Soundtrack
from django.contrib import admin
from media.forms import ImageForm, VideoForm, SoundtrackForm


class ImageAdmin(admin.ModelAdmin):
    form = ImageForm

    def save_model(self, request, obj, form, change):
        list_images = request.FILES.getlist('image')
        form.save_instances(list_images)


class VideoAdmin(admin.ModelAdmin):
    form = VideoForm

    def save_model(self, request, obj, form, change):
        list_videos = request.FILES.getlist('video')
        # save_object(instance=obj, list_file=list_videos)
        form.save_instances(list_videos)


class SoundtrackAdmin(admin.ModelAdmin):
    form = SoundtrackForm

    def save_model(self, request, obj, form, change):
        list_soundtrack = request.FILES.getlist('soundtrack')
        # save_object(instance=obj, list_file=list_soundtrack)
        form.save_instances(list_soundtrack)


def save_object(instance, list_file):
    game = instance.game
    role = instance.role
    if isinstance(instance, Image):
        for archive in list_file:
            instance = type(instance).objects.create(
                game=game, role=role, image=archive)
            instance.save()
    elif isinstance(instance, Video):
        for archive in list_file:
            instance = type(instance).objects.create(
                game=game, role=role, video=archive)
            instance.save()
    elif isinstance(instance, Soundtrack):
        for archive in list_file:
            instance = type(instance).objects.create(
                game=game, role=role, soundtrack=archive)
            instance.save()


admin.site.register(Image, ImageAdmin)
admin.site.register(Video, VideoAdmin)
admin.site.register(Soundtrack, SoundtrackAdmin)
