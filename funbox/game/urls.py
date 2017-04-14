from django.conf.urls import url, include
from game import views


urlpatterns = [
    url(r'^$', views.list, name='list'),
]