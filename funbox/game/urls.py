from django.conf.urls import url
from game import views
from game.views import GameViewSet
from rest_framework import renderers

game_list = GameViewSet.as_view({
        'get': 'list',
        'post': 'create'
})
game_detail = GameViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
})

urlpatterns = [

    url(r'^list/$', game_list, name="list"),
    url(r'^detail/(?P<pk>[0-9]+)/$', game_detail, name="detail"),
    url(r'^game-list/$', views.game_list, name="game-list"),
    url(r'^game-detail/(?P<pk>[0-9]+)/$', views.game_detail, name="game-detail"),

]
