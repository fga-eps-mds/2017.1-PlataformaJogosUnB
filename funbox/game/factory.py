import factory
from game.models import Game, Package


class GameFactory(factory.DjangoModelFactory):
    class Meta:
        model = Game

    name = factory.faker.Faker("word")
    cover_image = factory.django.ImageField()
    game_version = factory.LazyAttribute(lambda x: "1.0")
    official_repository = factory.faker.Faker("url")


class PackageFactory(factory.DjangoModelFactory):
    class Meta:
        model = Package

    package = factory.django.FileField(data=b'1' * 10, filename='package.deb')
    game = factory.SubFactory(GameFactory)
