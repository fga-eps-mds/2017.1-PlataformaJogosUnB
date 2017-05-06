from media.models import Image
from django import forms
from django.forms import ModelForm

class ImageForm(ModelForm):
    class Meta:
        model=Image
        fields=('game','role','image')
        widgets={"image": forms.FileInput(attrs={'id':'image','required':True,'multiple':True})}


