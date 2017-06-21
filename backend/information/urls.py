from information.views import GenreViewList
from django.conf.urls import url


urlpatterns = [
    url(r'genres', GenreViewList.as_view()),
]
