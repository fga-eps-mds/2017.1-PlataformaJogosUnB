class IssueHandler:

    def submit_issue(self,title,description,label,official_repository):
        session = get_session()
        issue = create_issue(title,description,label)
        url = create_url(official_repository)

        r = session.post(url, json.dumps(issue))

        if r.status_code == 201:
            print('Successfully created Issue "%s"' % title)
        else:
            print('Could not create Issue "%s"' % title)
            print('Response:', r.content)

    def create_url(self,official_repository):
        repo_owner = get_repo_owner(official_repository)
        repo_name = get_repo_name(official_repository)

        url = 'https://api.github.com/repos/%s/%s/issues' % (repo_owner, repo_name)
        return url

    def create_issue(self,title,description,label,official_repository):
        issue = {'title':title,
                'body':description,
                'milestone':None,
                'labels':[label]}

        return issue

    def get_repo_owner(self,official_repository):
        return 'asdf'

    def get_repo_name(self,official_repository):
        return 'asdd'

    def get_session():
        session = requests.Session()
        session.auth=('username', 'password')
        return session
