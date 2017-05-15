from django.contrib import admin
from .models import Game, Package, Platform
from information.models import Information
from media.models import Image, Video, Soundtrack
from .choices import EXTENSION_CHOICES
from media.forms import ImageForm, VideoForm, SoundtrackForm


class InformationInline(admin.StackedInline):
    model = Information


class ImageInline(admin.StackedInline):
    model = Image
    extra = 0
    min_num = 0
    form = ImageForm


class VideoInline(admin.StackedInline):
    model = Video
    extra = 0
    min_num = 0
    form = VideoForm


class SoundtrackInline(admin.StackedInline):
    model = Soundtrack
    extra = 0
    min_num = 0
    form = SoundtrackForm


class PackageInline(admin.StackedInline):
    model = Package
    exclude = ['platforms']
    extra = 0
    min_num = 1
    max_num = len(EXTENSION_CHOICES)


class PlatformsInline(admin.StackedInline):
    model = Package.platforms.through
    extra = 0
    min_num = 1
    max_num = len(EXTENSION_CHOICES)


class PackageAdmin(admin.ModelAdmin):
    exclude = ['platforms']


class GameAdmin(admin.ModelAdmin):
    #inlines = [InformationInline, PackageInline,
               #ImageInline, VideoInline, SoundtrackInline]

    inlines = [ImageInline, VideoInline, SoundtrackInline]

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)

        print(type(instances[0]))
        for forms in formset:
            print(forms.cleaned_data)

        for instance in instances:
            instance.save()
"""
        if isinstance(instances[0], Image):
            for count, forms in enumerate(formset):
                list_files = request.FILES.getlist(
                    'media_image-' + str(count) + '-image')
                forms.save_instances(list_files)
        elif isinstance(instances[0], Video):
            for count, forms in enumerate(formset):
                list_files = request.FILES.getlist(
                    'media_video-' + str(count) + '-video')
                forms.save_instances(list_files)
        elif isinstance(instances[0], Soundtrack):
            for count, forms in enumerate(formset):
                list_files = request.FILES.getlist(
                    'media_soundtrack-' + str(count) + '-soundtrack')
                forms.save_instances(list_files)
        else:
        for instance in instances:
            instance.save()
"""

admin.site.register(Game, GameAdmin)
admin.site.register(Platform)
admin.site.register(Package, PackageAdmin)
