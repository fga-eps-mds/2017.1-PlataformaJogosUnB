import json
import requests
import re


class IssueHandler:

    def submit_issue(self, title, description, official_repository):
        session = self.__get_session__()
        issue = self.__create_issue__(title, description)
        url = self.__create_url__(official_repository)

        response = session.post(url, json.dumps(issue))
        SUCCESS_STATUS = 201

        if response.status_code == SUCCESS_STATUS:
            print('Successfully created Issue {0}'.format(title))
        else:
            print('Could not create Issue {0}' .format(title))
            print('Response: ', response.content)

    def __create_url__(self, official_repository):
        match_object = self.__get_repo_information__(official_repository)
        repo_owner = match_object.group(1)
        repo_name = match_object.group(2)

        url = 'https://api.github.com/repos/{0}/{1}/issues' .format(repo_owner,
                                                                    repo_name)
        return url

    def __create_issue__(self, title, description):
        issue = {'title': title,
                 'body': description}

        return issue

    def __get_repo_information__(self, official_repository):
        match_object = re.search('https://github.com/(.+)/([^/]+)',
                                 official_repository)
        return match_object

    def __get_session__(self):
        session = requests.Session()
        session.auth = ('username', 'password')
        return session
