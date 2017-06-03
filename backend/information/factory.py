import factory
from factory.fuzzy import FuzzyChoice
from faker import Faker
from information.models import Award, Developer, Genre, Information
from game.factory import GameFactory


faker = Faker()


class AwardFactory(factory.DjangoModelFactory):

    class Meta:
        model = Award

    name = factory.faker.Faker("word")
    year = factory.LazyAttribute(lambda x: 2000 + (faker.pyint() % 17))
    place = factory.LazyAttribute(lambda x: "First")


class DeveloperFactory(factory.DjangoModelFactory):

    class Meta:
        model = Developer

    name = factory.faker.Faker("word")
    login = factory.faker.Faker("word")
    avatar = factory.django.ImageField(width=15, height=30)
    email = factory.LazyAttribute(lambda x: faker.first_name() + '@email.com')
    github_page = factory.faker.Faker("url")


class GenreFactory(factory.DjangoModelFactory):

    class Meta:
        model = Genre

    name = factory.faker.Faker("word")
    description = factory.LazyAttribute(lambda x: "word " * 12)


class InformationFactory(factory.DjangoModelFactory):

    class Meta:
        model = Information

    description = factory.LazyAttribute(lambda x: "word " * 12)
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
    def developers(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for developer in extracted:
                self.developers.add(developer)

    @factory.post_generation
    def genres(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for genre in extracted:
                self.genres.add(genre)
