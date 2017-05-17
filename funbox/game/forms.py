from django import forms


class ReportBugForm(forms.Form):
    title = forms.CharField(label='Bug title', max_length=70, min_length=1)
    description = forms.CharField(
        label='Bug description',
        max_length=100,
        required=False)
    issue_label = forms.CharField(
        label='Issue label',
        max_length=50,
        required=False)
