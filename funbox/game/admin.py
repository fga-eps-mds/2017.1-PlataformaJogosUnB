from django.contrib import admin
from .models import Game, Package
from information.models import Information


class InformationInline(admin.StackedInline):
    model = Information


class PackageInline(admin.StackedInline):
    model = Package


class GameAdmin(admin.ModelAdmin):
    inlines = [InformationInline, PackageInline]

admin.site.register(Game, GameAdmin)
admin.site.register(Package)
