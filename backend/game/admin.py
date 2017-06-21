from django.contrib import admin
from .models import Game, Package, Platform
from information.models import Information
from media.models import Image, Video, Soundtrack, Media
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


class PlatformsInline(admin.StackedInline):
    model = Package.platforms.through
    extra = 0
    min_num = 1
    max_num = len(EXTENSION_CHOICES)


class PackageAdmin(admin.ModelAdmin):
    exclude = ['platforms']


class GameAdmin(admin.ModelAdmin):
    inlines = [InformationInline, PackageInline,
               ImageInline, VideoInline, SoundtrackInline]
    exclude = ['slide_image', 'card_image']

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)

        for obj_form in formset.deleted_objects:
            obj_form.delete()
        for instance in instances:
            if not self.__save_media__(request, instance, formset, change):
                instance.save()
        formset.save_m2m()

    def __save_media__(self, request, instance, formset, change):
        if isinstance(instance, Media):
            model = instance.__class__.__name__.lower()
            for count, forms in enumerate(formset):
                list_files = request.FILES.getlist(
                    'media_{}-{}-{}'.format(model, str(count), model))
                obj = forms.cleaned_data['id']
                if len(list_files) > 0:
                    forms.save_instances(list_files, obj, change, model)
            return True
        return False


admin.site.register(Game, GameAdmin)
admin.site.register(Platform)
admin.site.register(Package, PackageAdmin)
