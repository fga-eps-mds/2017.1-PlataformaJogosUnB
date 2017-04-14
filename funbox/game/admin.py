from django.contrib import admin
from .models import Game
from information.models import Information


class InformationInline(admin.StackedInline):
    model = Information


class GameAdmin(admin.ModelAdmin):
    inlines = [InformationInline, ]


admin.site.register(Game, GameAdmin)
