from django.conf.urls import url
from game.views import GameViewSet

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
game_report_bug = GameViewSet.as_view({
    'get': 'report_bug',
    'post': 'report_bug'
})

urlpatterns = [

    url(r'^list/$', game_list, name="list"),
    url(r'^detail/(?P<pk>[0-9]+)/$', game_detail, name="detail"),
    url(r'^reportbug/$', game_report_bug, name="report_bug"),
]
