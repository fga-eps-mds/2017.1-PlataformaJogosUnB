import pytest


class PytestRunner:

    def __init__(self, failfast=False, verbosity=1, **kwargs):
        self.failfast = failfast
        self.verbosity = verbosity

    def run_tests(self, test_labels):
        argv = []

        if self.failfast:
            argv.append('-x')

        if self.verbosity == 0:
            argv.append('-q')
        elif self.verbosity == 1:
            argv.append('-s')
            argv.append('-v')
        elif self.verbosity == 2:
            argv.append('-s')
            argv.append('-vv')

        argv.extend(test_labels)
        return pytest.main(argv)
