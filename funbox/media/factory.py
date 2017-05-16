import factory
from media.models import Image, Video, Soundtrack


class ImageFactory(factory.DjangoModelFactory):
    class Meta:
        model = Image

    image = factory.django.ImageField(
        filename='image.jpg', color='orange', width=100, height=50
    )
    default_alt_text = factory.Sequence(lambda n: 'alt text {0}'.format(n))


class VideoFactory(factory.DjangoModelFactory):
    class Meta:
        model = Video

    video = factory.django.FileField(data=1, filename='video.mp4')
    

class SoundtrackFactory(factory.DjangoModelFactory):
    class Meta:
        model = Soundtrack

    soundtrack = factory.django.FileField(data=1, filename='song.mp3')