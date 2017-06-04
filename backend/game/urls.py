from game.views import GameViewSet

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'games', GameViewSet)

urlpatterns = router.urls
