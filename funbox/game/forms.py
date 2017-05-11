from django import forms

class ReportBugForm(forms.Form):
	tittle = forms.CharField(label='Bug tittle', max_length=50)
	description = forms.CharField(label='Bug description', max_length=100)
