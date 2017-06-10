from django.contrib import admin
from information.models import (
     Information, Developer, Artist, Musician, Award, Genre
)


class AwardsInline(admin.TabularInline):
    model = Information.awards.through


class AwardAdmin(admin.ModelAdmin):
    list_display = ['name', 'year', 'place', ]
    search_fields = ['name', 'year', 'place', ]


class DevelopmentsInline(admin.TabularInline):
    model = Information.developers.through


class DevelopmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', ]
    search_fields = ['name', 'email', ]


class MusiciansInline(admin.TabularInline):
    model = Information.musicians.through


class MusicianAdmin(admin.ModelAdmin):
    search_fields = ['name', 'email', ]
    list_display = ['name', 'email', ]


class ArtistsInline(admin.TabularInline):
    model = Information.artists.through


class ArtistAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', ]
    search_fields = ['name', 'email', ]


class GenresInline(admin.TabularInline):
    model = Information.genres.through


class GenreAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', ]
    search_fields = ['name', ]


class InformationAdmin(admin.ModelAdmin):
    inlines = [AwardsInline, DevelopmentsInline, ArtistsInline,
               MusiciansInline, GenresInline, ]
    exclude = ('developers', 'musicians', 'artists', 'awards', 'genres')


admin.site.register(Developer, DevelopmentAdmin)
admin.site.register(Artist, ArtistAdmin)
admin.site.register(Musician, MusicianAdmin)
admin.site.register(Award, AwardAdmin)
admin.site.register(Genre, GenreAdmin)
