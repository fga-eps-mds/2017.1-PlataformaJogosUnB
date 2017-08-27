from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class MediaConfig(AppConfig):
    name = 'media'
    verbose_name = _('media')
