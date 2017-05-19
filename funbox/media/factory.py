import factory
from game.factory import GameFactory
from media.models import Media, Image

class ImageFactory(factory.DjangoModelFactory):

    class Meta:
        model = Image

    image = factory.django.ImageField(width=1024, height=768)
    game = factory.SubFactory(GameFactory)
