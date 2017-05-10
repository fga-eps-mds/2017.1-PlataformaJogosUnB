from media.models import Image
from django.contrib import admin
from media.forms import ImageForm

class ImageInline(admin.StackedInline):
      model = Image
      extra = 0
      min_num = 1
      form = ImageForm

class ImageAdmin(admin.ModelAdmin):
      inlines = [ImageInline]




