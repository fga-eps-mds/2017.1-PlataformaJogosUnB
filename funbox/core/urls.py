from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import (
    password_reset, password_reset_done, password_reset_confirm,
    password_reset_complete,
)
from core import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^admin/reset-password/$', password_reset, name='reset_password'),
    url(r'^admin/reset-password/done/$',
        password_reset_done, name='password_reset_done'),
    url(r'^admin/reset-password/confirm/(?P<uidb64>[0-9A-Za-z]+)-\
        (?P<token>.+)/$',
        password_reset_confirm, name='password_reset_confirm'),
    url(r'^admin/reset-password/complete/$',
        password_reset_complete, name='password_reset_complete'),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
]

urlpatterns += staticfiles_urlpatterns()
