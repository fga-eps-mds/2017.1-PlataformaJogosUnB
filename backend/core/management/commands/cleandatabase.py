from django.core.management.base import BaseCommand
from django.core.management import call_command
from media.factory import ImageFactory
from information.factory import AwardFactory, DeveloperFactory, \
    GenreFactory, InformationFactory
import os


class Command(BaseCommand):
    help = """Remove actual migrations, generate and migrate new migrations,\"
  " and create dummy data in database."""

    def handle(self, *args, **kwargs):
        call_command('reset_db')
        os.system("rm -rf */migrations/0*.py")
        call_command('makemigrations', 'game')
        call_command('makemigrations', 'information')
        call_command('makemigrations', 'media')
        os.system("python3 manage.py migrate")

        for i in range(30):
            award_1 = AwardFactory.create_batch(2)
            developer_1 = DeveloperFactory.create_batch(2)
            genre_1 = GenreFactory.create_batch(2)

            information = InformationFactory.create(
                awards=award_1, developers=developer_1, genres=genre_1)
            for j in range(7):
                image = ImageFactory(game=information.game)
                # Next line added to use 'image' variable.
                image.save()
