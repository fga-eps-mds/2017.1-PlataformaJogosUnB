import json
import requests
import re


class IssueHandler:

    def submit_issue(self, title, description, official_repository):
        session = self.get_session()
        issue = self.create_issue(title, description)
        url = self.create_url(official_repository)

        response = session.post(url, json.dumps(issue))
        SUCCESS_STATUS = 201

        if response.status_code == SUCCESS_STATUS:
            print('Successfully created Issue {0}'.format(title))
        else:
            print('Could not create Issue {0}' .format(title))
            print('Response: ', response.content)

    def create_url(self, official_repository):
        match_object = self.get_repo_owner_and_repo_name(official_repository)
        repo_owner = match_object.group(1)
        repo_name = match_object.group(2)

        url = 'https://api.github.com/repos/{0}/{1}/issues' .format(repo_owner,
                                                                    repo_name)
        return url

    def create_issue(self, title, description):
        issue = {'title': title,
                 'body': description}

        return issue

    def get_repo_owner_and_repo_name(self, official_repository):
        match_object = re.search('https://github.com/(.+)/([^/]+)',
                                 official_repository)
        return match_object

    def get_session(self):
        session = requests.Session()
        session.auth = ('username', 'password')
        return session
