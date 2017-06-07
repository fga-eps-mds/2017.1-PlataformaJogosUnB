from django.conf.urls import url
from rest_framework import routers
from information.views import VoteView

#router = routers.SimpleRouter()

#router.register(r'^vote', VoteView.post)


#urlpatterns = router.urls
urlpatterns = [
    url(r'^vote', VoteView.post)
]
