from django.contrib import admin
from .models import Game
from information.models import Information
from media.models import Media


class InformationInline(admin.StackedInline):
    model = Information


class MediaInline(admin.StackedInline):
    model = Media


class GameAdmin(admin.ModelAdmin):
    inlines = [InformationInline, MediaInline, ]


admin.site.register(Game, GameAdmin)
