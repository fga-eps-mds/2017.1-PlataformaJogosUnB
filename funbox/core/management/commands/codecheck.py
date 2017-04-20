from django.core.management.base import BaseCommand
import os


class Command(BaseCommand):
    help = """Check files developed in project and make a verification
              for pep8 violation, test, code quality metrics"""

    def handle(self, *args, **kwargs):
        path = os.path.realpath('.')
        os.system("pytest -q --cov %s --cov-report=html " % path)
        os.system("flake8 --count --statistics %s" % path)
        os.system("radon cc -s %s" % path)
        print(self.message())

    def message(self):
        return """Verification:
        Use this as reference for complexity:
        http://radon.readthedocs.io/en/latest/intro.html#cyclomatic-complexity
        """
