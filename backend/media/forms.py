from media.models import Image, Video, Soundtrack
from django import forms
from django.forms import ModelForm
from django.apps import apps


class MediaForm(ModelForm):

    class Meta:
        abstract = True

    def save_instances(self, list_files, obj, change, type_instance):
        game = self.cleaned_data['game']
        role = self.cleaned_data['role']
        list_files = self.update_medias(
            obj, list_files, change, type_instance)
        for archive in list_files:
            instance = apps.get_model('media', type_instance)()
            instance.game = game
            instance.role = role
            setattr(instance, type_instance, archive)
            instance.save()

    def update_medias(self, obj, list_files, change, type_instance):
        if change and obj:
            obj.game = self.cleaned_data['game']
            obj.role = self.cleaned_data['role']
            setattr(obj, type_instance, list_files[0])
            obj.save()
            del list_files[0]
        return list_files


class ImageForm(MediaForm):

    class Meta:
        fields = ('game', 'role', 'image')
        model = Image
        widgets = {
            "image": forms.FileInput(
                attrs={
                    'id': 'image',
                    'required': False,
                    'multiple': True})}


class VideoForm(MediaForm):

    class Meta:
        widgets = {
            "video": forms.FileInput(
                attrs={
                    'id': 'video',
                    'required': False,
                    'multiple': True})}
        model = Video
        fields = ('game', 'role', 'video')


class SoundtrackForm(MediaForm):

    class Meta:
        model = Soundtrack
        fields = ('game', 'role', 'soundtrack')
        widgets = {
            "soundtrack": forms.FileInput(
                attrs={
                    'id': 'soundtrack',
                    'required': False,
                    'multiple': True})}
