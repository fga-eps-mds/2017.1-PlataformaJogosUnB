from django.contrib import admin
from .models import Game, Package, Platform
from information.models import Information
from media.models import Image, Video, Soundtrack
from .choices import EXTENSION_CHOICES


class InformationInline(admin.StackedInline):
    model = Information


class ImageInline(admin.StackedInline):
    model = Image
    extra = 0
    min_num = 1


class VideoInline(admin.StackedInline):
    model = Video
    extra = 0
    min_num = 0


class SoundtrackInline(admin.StackedInline):
    model = Soundtrack
    extra = 0
    min_num = 0


class PackageInline(admin.StackedInline):
    model = Package
    extra = 0
    min_num = 1
    max_num = len(EXTENSION_CHOICES)


class PlatformsInline(admin.StackedInline):
    model = Package.platforms.through
    extra = 0
    min_num = 1
    max_num = len(EXTENSION_CHOICES)


class GameAdmin(admin.ModelAdmin):
    inlines = [InformationInline, PackageInline,
               ImageInline, VideoInline, SoundtrackInline]


admin.site.register(Game, GameAdmin)
admin.site.register(Image)
admin.site.register(Video)
admin.site.register(Soundtrack)
admin.site.register(Platform)
admin.site.register(Package)
