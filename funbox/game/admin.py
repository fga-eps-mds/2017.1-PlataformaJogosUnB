from django.contrib import admin
from .models import Game
from information.models import Information
from media.models import Image, Video, Soundtrack


class InformationInline(admin.StackedInline):
    model = Information


class ImageInline(admin.StackedInline):
    model = Image
    extra = 0
    min_num = 1


class VideoInline(admin.StackedInline):
    model = Video
    extra = 0
    min_num = 1


class SoundtrackInline(admin.StackedInline):
    model = Soundtrack
    extra = 0
    min_num = 1


class GameAdmin(admin.ModelAdmin):
    inlines = [InformationInline, ImageInline, VideoInline, SoundtrackInline]

admin.site.register(Game, GameAdmin)
admin.site.register(Image)
admin.site.register(Video)
admin.site.register(Soundtrack)
