from django.conf.urls import url
from game import views

urlpatterns = [
    url(r'^game-list/$', views.game_list, name='list'),
    url(r'^game-detail/(?P<pk>[0-9]+)/$', views.game_detail, name='detail'),
]
