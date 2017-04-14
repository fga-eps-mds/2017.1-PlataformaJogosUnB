from django.contrib import admin
from media.models import Media


class MediaAdmin(admin.ModelAdmin):
    exclude = ('game', )


admin.site.register(Media, MediaAdmin)
