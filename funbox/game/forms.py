from django import forms

class ReportBugForm(forms.Form):
    title = forms.CharField(label='Bug title', max_length=50)
    description = forms.CharField(label='Bug description', max_length=100)
    post_anonymously = forms.BooleanField(required=False,initial=False,label='Anonimous')
    github_user = forms.CharField(label='GitHub user', max_length=50)
