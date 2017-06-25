from game.utils.issue_handler import IssueHandler
import pytest
import requests
import json


class TestIssueHandler:

    @pytest.fixture
    def issue(self):
        return IssueHandler()

    @pytest.fixture
    def repository(self):
        return 'https://github.com/dono/repositorio'

    def test_get_session(self, issue):
        assert issue.__get_session__().auth == ('username', 'password')
        assert isinstance(issue.__get_session__(), requests.Session)

    def test_invalid_repository_name(self, issue, repository):
        assert issue.__get_repo_information__(repository[:18]) is None

    @pytest.mark.parametrize('group, value', [
        (0, 'https://github.com/dono/repositorio'),
        (1, 'dono'),
        (2, 'repositorio')])
    def test_repository_name(self, issue, group, value, repository):
        match = issue.__get_repo_information__(repository)
        assert match.group(group) == value

    def test_create_url(self, issue, repository):
        url = issue.__create_url__(repository)
        assert url == 'https://api.github.com/repos/dono/repositorio/issues'

    def test_break_create_url(self, issue, repository):
        with pytest.raises(AttributeError) as error:
            issue.__create_url__(repository[:18])
        assert str(error.value) == "'NoneType' object has no attribute" \
            " 'group'"

    def test_create_issue(self, issue):
        title = 'xalla'
        description = 'description'
        assert {'title': 'xalla',
                'body': 'description'} == issue.__create_issue__(
                    title, description)

    def test_submit_issue(self, issue, mock, repository):

        class Response:
            status_code = 201

        with mock.patch('requests.Session.post', return_value=Response()) as r:
            m = mock.patch('builtins.print')
            t_print = m.start()
            issue.submit_issue('title', 'description', repository)
            assert r.called_once_with('https://api.github.com/repos/dono' +
                                      '/repositorio/issues',
                                      json.dumps({
                                          'title': 'title',
                                          'description': 'description'}))
            m.stop()
            assert t_print.called_once_with('Successfully created Issue title')

    def test_fail_submit_issue(self, issue, mock, repository):

        class Response:
            status_code = 403
            content = "Problem in submit issue"

        with mock.patch('requests.Session.post', return_value=Response()) as r:
            m = mock.patch('builtins.print')
            t_print = m.start()
            issue.submit_issue('title', 'description', repository)
            assert r.called_once_with('https://api.github.com/repos/dono' +
                                      '/repositorio/issues',
                                      json.dumps({
                                          'title': 'title',
                                          'description': 'description'}))
            m.stop()
            assert t_print.called_with('Could not create Issue title')
            assert t_print.called_with('Response: Problem in submit issue')
