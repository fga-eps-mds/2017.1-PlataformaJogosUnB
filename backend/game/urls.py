from game.views import GameViewSet
from game.views import PackageCreateView
from rest_framework import routers
from django.conf.urls import url, include


router = routers.SimpleRouter()
router.register(r'games', GameViewSet)

game_report_bug = GameViewSet.as_view({
    'post': 'report_bug'
})

urlpatterns = [
    url(r'^packages', PackageCreateView.as_view()),
    url(r'^', include(router.urls))
    url(r'^reportbug/(?P<pk>[0-9]+)/$', game_report_bug, name="report_bug"),
]
