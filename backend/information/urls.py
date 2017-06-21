from information.views import GenreViewList, GenresApi
from django.conf.urls import url


urlpatterns = [
    url(r'^genres/$', GenreViewList.as_view()),
    url(r'^genres/games/$', GenresApi.as_view())
]
