from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class GameConfig(AppConfig):
    name = 'game'
    verbose_name = _('game')
    # label = 'my.core'
