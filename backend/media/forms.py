from media.models import Image, Video, Soundtrack
from django import forms
from django.forms import ModelForm


class ImageForm(ModelForm):
    class Meta:
        model = Image
        fields = ('game', 'role', 'image')
        widgets = {
            "image": forms.FileInput(
                attrs={
                    'id': 'image',
                    'required': False,
                    'multiple': True})}

    def save_instances(self, list_files, obj, change):
        game = self.cleaned_data['game']
        role = self.cleaned_data['role']
        list_files = update_saved_medias(obj, list_files, change, self, 'image')
        for archive in list_files:
            instance = Image.objects.create(
                game=game, role=role, image=archive)
            instance.save()


class VideoForm(ModelForm):
    class Meta:
        model = Video
        fields = ('game', 'role', 'video')
        widgets = {
            "video": forms.FileInput(
                attrs={
                    'id': 'video',
                    'required': False,
                    'multiple': True})}

    def save_instances(self, list_files, obj, change):
        game = self.cleaned_data['game']
        role = self.cleaned_data['role']
        list_files = update_saved_medias(obj, list_files, change, self, 'video')
        for archive in list_files:
            instance = Video.objects.create(
                game=game, role=role, video=archive)
            instance.save()


class SoundtrackForm(ModelForm):
    class Meta:
        model = Soundtrack
        fields = ('game', 'role', 'soundtrack')
        widgets = {
            "soundtrack": forms.FileInput(
                attrs={
                    'id': 'soundtrack',
                    'required': False,
                    'multiple': True})}

    def save_instances(self, list_files, obj, change):
        game = self.cleaned_data['game']
        role = self.cleaned_data['role']
        list_files = update_saved_medias(obj, list_files, change, self, 'soundtrack')
        for archive in list_files:
            instance = Soundtrack.objects.create(
                game=game, role=role, soundtrack=archive)
            instance.save()


def update_saved_medias(obj, list_files, change, form, type_instance):
    if change:
        obj.game = form.cleaned_data['game']
        obj.role = form.cleaned_data['role']
        setattr(obj, type_instance, list_files[0])
        obj.save()
        del list_files[0]
        return list_files
    else:
        return list_files
