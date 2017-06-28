"""
WSGI config for funbox project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
os.environ["sk"] = "<eMW7w?ru<B)[EREGk%\`jQv\'wc}+X{2_,=~2Q=p}u,D1wOK0UX"
os.environ["pjunbsmtp"] = "funbox@pjunb"
os.environ["pjunbdb"] = "pjunb"
os.environ["sk"] = "<eMW7w?ru<B)[EREGk%\`jQv\'wc}+X{2_,=~2Q=p}u,D1wOK0UX"
os.environ["authfacebookkey"] = "1850394608544081"
os.environ["authfacebooksecret"] = "431158b81ec66c753d529962bfef2a87"

application = get_wsgi_application()
