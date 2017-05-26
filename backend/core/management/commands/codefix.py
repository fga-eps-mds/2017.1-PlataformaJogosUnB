from django.core.management.base import BaseCommand
import os


class Command(BaseCommand):
    help = """Do little fixes when possible in code style using autopep8"""

    def handle(self, *args, **kwargs):
        path = os.path.realpath('.')
        os.system(
            "autopep8 --exclude=migrations,settings.py,__init__.py -iar %s" %
            path)
