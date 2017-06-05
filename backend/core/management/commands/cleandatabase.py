from django.core.management.base import BaseCommand
from django.core.management import call_command
from media.factory import ImageFactory, VideoFactory
from information.factory import AwardFactory, DeveloperFactory, \
    GenreFactory, InformationFactory
from core.factory import UserFactory
from game.factory import PlatformFactory, PackageFactory
import os


class Command(BaseCommand):
    help = """Remove actual migrations, generate and migrate new migrations,\"
  " and create dummy data in database."""

    def handle(self, *args, **kwargs):
        self.__clean_old__(*args, **kwargs)
        self.__new_database__(*args, **kwargs)
        genres, awards = self.__single_data__(*args, **kwargs)
        self.__multiple_data__(genres, awards, *args, **kwargs)
        self.stdout.write("create superuser\nadmin:qwer1234")
        UserFactory()

    def add_arguments(self, parser):
        parser.add_argument(
            '-s',
            type=int,
            dest='non_loop',
            default=3,
            help='The number of single objects to be created(genre, award)'
        )
        parser.add_argument(
            '-m',
            type=int,
            dest='loop',
            default=10,
            help='The number of games and information to be created'
        )
        parser.add_argument(
            '-i',
            type=int,
            dest='media',
            default=1,
            help='The number of images to each game'
        )
        parser.add_argument(
            '-V',
            type=int,
            dest='video',
            default=0,
            help='The number of videos to each game'
        )

    def __clean_old__(self, *args, **kwargs):
        self.stdout.write("reset database")
        call_command('reset_db')
        self.stdout.write("clean old migrations")
        os.system("rm -vrf */migrations/0*.py")
        self.stdout.write("clean old images, packages, videos")
        os.system("rm -vrf public/*")

    def __new_database__(self, *args, **kwargs):
        self.stdout.write("generate new migrations")
        call_command('makemigrations')
        self.stdout.write("migrate to database")
        call_command("migrate")

    def __single_data__(self, *args, **kwargs):
        self.stdout.write("Start the creation of dummy data")
        genre = GenreFactory.create_batch(kwargs['non_loop'])
        self.stdout.write("Genre: {}".format("." * kwargs['non_loop']))
        award = AwardFactory.create_batch(kwargs['non_loop'])
        self.stdout.write("Award: {}".format("." * kwargs['non_loop']))
        PlatformFactory()
        self.stdout.write("Platform: .")
        return (genre, award)

    def __multiple_data__(self, genre, award, *args, **kwargs):
        for i in range(1, kwargs['loop'] + 1):
            self.stdout.write("Game {}:".format(i))
            developer = DeveloperFactory.create_batch(kwargs['non_loop'])
            self.stdout.write("\tDeveloper: {}".format(
                "." * kwargs['non_loop']))

            information = InformationFactory.create(
                awards=[award[i % kwargs['non_loop']]],
                developers=developer,
                genres=[genre[i % kwargs['non_loop']]])
            self.stdout.write("\tInformation: .")
            ImageFactory.create_batch(kwargs['media'], game=information.game)
            self.stdout.write("\tImage: {}".format("." * kwargs['media']))
            VideoFactory.create_batch(kwargs['video'], game=information.game)
            self.stdout.write("\tVideo: {}".format("." * kwargs['video']))
            PackageFactory(game=information.game)
            self.stdout.write("\tPackage: .")
