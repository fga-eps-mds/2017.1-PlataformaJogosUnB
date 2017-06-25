import factory
from game.factory import GameFactory
from media.models import Image, Video, Soundtrack
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

    video = factory.django.FileField(data=b'1' * 10, filename='video.mp4')
    game = factory.SubFactory(GameFactory)


class SoundtrackFactory(factory.DjangoModelFactory):

    class Meta:
        model = Soundtrack

    soundtrack = factory.django.FileField(
        data=b'1' * 10, filename='soundtrack.mp3')
    game = factory.SubFactory(GameFactory)
