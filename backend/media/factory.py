import factory
from game.factory import *
from media.models import Media, Image, Video, Soundtrack
from faker import Faker

faker = Faker()

class ImageFactory(factory.DjangoModelFactory):

    class Meta:
        model = Image

    image = factory.django.ImageField(
        width=1200, height=675, color=faker.safe_color_name())
    game = factory.SubFactory(GameFactory)
    # default_alt_text = factory.Sequence(lambda n: 'alt text {0}'.format(n))


class VideoFactory(factory.DjangoModelFactory):

    class Meta:
        model = Video

    video = factory.django.FileField(filename='video.mp4')
    game = factory.SubFactory(GameFactory)


class SoundtrackFactory(factory.DjangoModelFactory):

    class Meta:
        model = Soundtrack

    soundtrack = factory.django.FileField(filename='soundtrack.mp3')
