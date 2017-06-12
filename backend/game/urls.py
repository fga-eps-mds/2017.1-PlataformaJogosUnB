from game.views import GameViewSet
from game.views import PackageCreateView
from rest_framework import routers
from django.conf.urls import url, include

router = routers.SimpleRouter()
router.register(r'games', GameViewSet)

urlpatterns = [
    url(r'^packages', PackageCreateView.as_view()),
    url(r'^', include(router.urls))
]
