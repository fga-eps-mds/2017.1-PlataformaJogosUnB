from game.views import (
    GameViewSet, PackageCreateView, downloads, PlatformViewList
)
from rest_framework import routers
from django.conf.urls import url, include


router = routers.SimpleRouter()
router.register(r'games', GameViewSet, base_name='game')

urlpatterns = [
    url(r'^packages/$', PackageCreateView.as_view()),
    url(r'^packages/(?P<pk>[0-9]+)/downloads/$', downloads),
    url(r'^', include(router.urls)),
    url(r'platforms', PlatformViewList.as_view())
]
