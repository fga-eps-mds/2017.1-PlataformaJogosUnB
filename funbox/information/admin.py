from django.contrib import admin
from information.models import Information, Developer, Award, Genre


class AwardsInline(admin.TabularInline):
    model = Information.awards.through

class DevelopmentsInline(admin.TabularInline):
    model = Information.developers.through

class GenresInline(admin.TabularInline):
    model = Information.genres.through

class GenreAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', ]
    search_fields = ['name', ]

class InformationAdmin(admin.ModelAdmin):
    inlines = [AwardsInline, DevelopmentsInline, GenresInline, ]
    exclude = ('developers', 'awards', 'genres')

admin.site.register(Developer)
admin.site.register(Award)
admin.site.register(Genre, GenreAdmin)
