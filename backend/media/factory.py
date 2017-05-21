import factory
from game.factory import *
from media.models import Media, Image
from faker import Faker

faker = Faker()


class ImageFactory(factory.DjangoModelFactory):

    class Meta:
        model = Image

    image = factory.django.ImageField(
        width=1200, height=675, color=faker.safe_color_name())
    game = factory.SubFactory(GameFactory)
