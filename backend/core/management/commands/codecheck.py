from django.core.management.base import BaseCommand
from core.settings import BASE_DIR
import os


class Command(BaseCommand):
    help = """Check files developed in project and make a verification
              for pep8 violation, test, code quality metrics"""

    def handle(self, *args, **kwargs):
        path = os.path.realpath('.')

        os.system("pytest -q --cov-config {}/.coveragerc --cov-report "
                  "term-missing --cov-report html --cov".format(BASE_DIR))
        print("\nCode style check:")
        os.system("flake8 --exclude=settings.py,migrations --count "
                  "--statistics %s" % path)
        os.system("radon cc --total-average -sn B %s" % path)
        print(self.message())

    def message(self):
        return """Verification:
        Use this as reference for complexity:
        http://radon.readthedocs.io/en/latest/intro.html#cyclomatic-complexity
        """
