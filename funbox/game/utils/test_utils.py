# TODO colocar minimo de caracteres para titulo da Issue
# TODO setup


import pytest
from game.models import Game
from game.utils.issue_handler import IssueHandler
from core.helper_test import validation_test, mount_error_dict, ErrorMessage


def issue_handler_creation(self):
    return IssueHandler()

class TestIssueHandler:

    def test_get_repo_owner_and_repo_name(self):
        issue_handler = issue_handler_creation(self)

        official_repository = 'https: //github.com/TestOwner/TestRepository'
        match_object = issue_handler.get_repo_owner_and_repo_name \
        (official_repository)

        assert match_object.group(1) == 'TestOwner'
        assert match_object.group(2) == 'TestRepository'

    def test_create_issue(self):
        issue_handler = issue_handler_creation(self)

        title = 'Test issue'
        description = 'This is a test issue'
        label = 'test'

        issue = {'title': title,
                'body': description,
                'milestone': None,
                'labels': [label]
        }

        result_issue = issue_handler.create_issue(title, description, label)

        assert result_issue == issue

    def test_create_url(self):
        issue_handler = issue_handler_creation(self)

        official_repository = 'https: //github.com/TestOwner/TestRepository'

        result_url = issue_handler.create_url(official_repository)
        assert result_url == 'https: //api.github.com/repos/TestOwner/'\
        'TestRepository/issues'
