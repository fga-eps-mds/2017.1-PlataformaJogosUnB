from django.conf.urls import url
from rest_framework import routers
from information.views import VoteView

urlpatterns = [
    url(r'^vote/(?P<pk>\d+)/$', VoteView.as_view())
]
