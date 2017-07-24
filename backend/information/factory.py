import factory
from factory.fuzzy import FuzzyChoice
from faker import Faker
from information.models import (
    Award, Genre, Credit, Information
)
from game.factory import GameFactory


faker = Faker()


class AwardFactory(factory.DjangoModelFactory):

    class Meta:
        model = Award

    name = factory.LazyAttribute(lambda x: "Melhor Arte")
    place = factory.LazyAttribute(lambda x: "Primeiro Lugar")


class CreditFactory(factory.DjangoModelFactory):

    class Meta:
        model = Credit

    specialty = factory.Sequence(lambda x: ['desenvolvedor', 'musico',
                                            'design'][x % 3])
    name = factory.faker.Faker("word")
    email = factory.LazyAttribute(lambda x: faker.first_name() + '@email.com')
    github_page = factory.faker.Faker("url")
    behance_page = factory.faker.Faker("url")
    soundCloud_page = factory.faker.Faker("url")
    personal_page = factory.faker.Faker("url")


class GenreFactory(factory.DjangoModelFactory):

    class Meta:
        model = Genre

    name = factory.faker.Faker("word")
    description = factory.faker.Faker("sentence", nb_words=25)


class InformationFactory(factory.DjangoModelFactory):

    class Meta:
        model = Information

    description = factory.faker.Faker('sentence', nb_words=25)
    launch_year = factory.LazyAttribute(lambda x: 2000 + faker.pyint() % 17)
    semester = FuzzyChoice(['1', '2'])
    game = factory.SubFactory(GameFactory)

    @factory.post_generation
    def awards(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for award in extracted:
                self.awards.add(award)

    @factory.post_generation
    def credits(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for credit in extracted:
                self.credits.add(credit)

    @factory.post_generation
    def genres(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for genre in extracted:
                self.genres.add(genre)
