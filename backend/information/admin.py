from django.contrib import admin
from information.models import (
    Information, Credit, Award, Genre
)


class AwardsInline(admin.TabularInline):
    model = Information.awards.through


class AwardAdmin(admin.ModelAdmin):
    list_display = ['name', 'year', 'place', ]
    search_fields = ['name', 'year', 'place', ]


class CreditsInline(admin.TabularInline):
    model = Information.credits.through


class CreditAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', ]
    search_fields = ['name', 'email', ]


class GenresInline(admin.TabularInline):
    model = Information.genres.through


class GenreAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', ]
    search_fields = ['name', ]


class InformationAdmin(admin.ModelAdmin):
    inlines = [AwardsInline, CreditsInline, GenresInline, ]
    exclude = ('credits', 'awards', 'genres')


admin.site.register(Credit, CreditAdmin)
admin.site.register(Award, AwardAdmin)
admin.site.register(Genre, GenreAdmin)
