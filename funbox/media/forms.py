from media.models import Image, Video, Soundtrack
from django import forms
from django.forms import ModelForm

class ImageForm(ModelForm):
    class Meta:
        model=Image
        fields=('game','role','image')
        widgets={"image": forms.FileInput(attrs={'id':'image','required':True,'multiple':True})}


class VideoForm(ModelForm):
    class Meta:
        model=Video
        fields=('game','role','video')
        widgets={"video": forms.FileInput(attrs={'id':'video','required':True,'multiple':True})}


class SoundtrackForm(ModelForm):
    class Meta:
        model=Soundtrack
        fields=('game','role','soundtrack')
        widgets={"soundtrack": forms.FileInput(attrs={'id':'soundtrack','required':True,'multiple':True})}
