from django import forms


class ReportBugForm(forms.Form):
    title = forms.CharField(label='Bug title', max_length=50)
    description = forms.CharField(label='Bug description', max_length=100)
    issue_label = forms.CharField(label='Issue label', max_length=50)
