from django.core.management.base import BaseCommand
from django.core.management import call_command
import os


class Command(BaseCommand):
    help = """Only run the server if check all codestyles"""

    def handle(self, *args, **kwargs):
        path = os.path.realpath('.')
        result = os.system("flake8 --exclude=settings.py,migrations %s" % path)
        if result == 0:
            call_command('makemigrations')
            call_command('migrate')
            call_command('runserver', '0.0.0.0:8000')
        else:
            print("Try small fix")
            call_command('codefix')
            if input("try run again?\ny - yes\nother - no\n") == "y":
                call_command('cleanrun')
