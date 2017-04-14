from django.contrib import admin
from .models import Game, Package, Platform
from information.models import Information
from .choices import EXTENSION_CHOICES


class InformationInline(admin.StackedInline):
    model = Information


class PackageInline(admin.StackedInline):
    model = Package
    extra = 0
    min_num = 1
    max_num = len(EXTENSION_CHOICES)


class PlatformsInline(admin.StackedInline):
    model = Package.platform.through
    exclude = ('platforms', )
    extra = 0
    min_num = 1
    max_num = len(EXTENSION_CHOICES)


class PackageAdmin(admin.ModelAdmin):
    inlines = [PlatformsInline, ]
    exclude = ('platforms', )


class GameAdmin(admin.ModelAdmin):
    inlines = [InformationInline, PackageInline, ]


admin.site.register(Game, GameAdmin)
admin.site.register(Package, PackageAdmin)
admin.site.register(Platform)
