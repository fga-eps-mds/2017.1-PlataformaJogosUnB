from media.models import Image, Video, Soundtrack
from django.contrib import admin
from media.forms import ImageForm


class ImageAdmin(admin.ModelAdmin):
    form = ImageForm

admin.site.register(Image, ImageAdmin)
