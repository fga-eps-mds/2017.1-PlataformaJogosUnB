from django.conf.urls import url, include
from rest_framework import routers
from media.views import (
    ImageCreateView,
    VideoCreateView,
    SoundtrackCreateView
)

router = routers.SimpleRouter()

urlpatterns = [
    url(r'^images', ImageCreateView.as_view()),
    url(r'^videos', VideoCreateView.as_view()),
    url(r'^soundtracks', SoundtrackCreateView.as_view()),
    url(r'^', include(router.urls))
]
