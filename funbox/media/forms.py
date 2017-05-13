from media.models import Image, Video, Soundtrack
from django import forms
from django.forms import ModelForm

class ImageForm(ModelForm):
    class Meta:
        model=Image
        fields=('game','role','image')
        widgets={"image": forms.FileInput(attrs={'id':'image','required':True,'multiple':True})}

    def save_instances(self, list_files):
        game = self.cleaned_data['game']
        role = self.cleaned_data['role']
        print(list_files)
        for archive in list_files:
            instance = Image.objects.create(game=game,role=role,image=archive)
            instance.save()


class VideoForm(ModelForm):
    class Meta:
        model=Video
        fields=('game','role','video')
        widgets={"video": forms.FileInput(attrs={'id':'video','required':True,'multiple':True})}

    def save_instances(self, list_files):
        game = self.cleaned_data['game']
        role = self.cleaned_data['role']
        print(list_files)
        for archive in list_files:
            instance = Video.objects.create(game=game,role=role,video=archive)
            instance.save()

class SoundtrackForm(ModelForm):
    class Meta:
        model=Soundtrack
        fields=('game','role','soundtrack')
        widgets={"soundtrack": forms.FileInput(attrs={'id':'soundtrack','required':True,'multiple':True})}

    def save_instances(self, list_files):
        game = self.cleaned_data['game']
        role = self.cleaned_data['role']
        print(list_files)
        for archive in list_files:
            instance = Soundtrack.objects.create(game=game,role=role,soundtrack=archive)
            instance.save()
