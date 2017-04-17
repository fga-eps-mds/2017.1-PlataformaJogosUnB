from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import (
password_reset, password_reset_done, password_reset_confirm,
password_reset_complete,
)
from rest_framework.urlpatterns import format_suffix_patterns
from core import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^about/$', views.about, name='about'),
    url(r'^admin/', admin.site.urls),
    url(r'^admin/reset-password/$', password_reset, name='reset_password'),
    url(r'^admin/reset-password/done/$',
	password_reset_done, name='password_reset_done'),
    url(r'^admin/reset-password/confirm/(?P<uidb64>[0-9A-Za-z]+)' +
	'-(?P<token>.+)/$', password_reset_confirm,
	name='password_reset_confirm'),
    url(r'^admin/reset-password/complete/$',
	password_reset_complete, name='password_reset_complete'),
    url(r'^api-auth/', include('rest_framework.urls',
	namespace='rest_framework')),
    url(r'^games/', include('game.urls', namespace='game')),
]

urlpatterns = format_suffix_patterns(urlpatterns)


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
