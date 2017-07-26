from django.core.management.base import BaseCommand
from django.core.management import call_command
import os


class Command(BaseCommand):
    help = """Generate dump from unbgames database and compress medias."""

    def handle(self, *args, **kwargs):
        self.__generate_backup_directory__(*args, **kwargs)
        self.__generate_postgres_dump__(*args, **kwargs)
        self.__generate_tar_from_statics__(*args, **kwargs)

    def __generate_backup_directory__(self, *args, **kwargs):
        self.stdout.write("Generating backup directory")
        os.system("mkdir /var/local/2017.1-PlataformaJogosUnB/backup")
        self.__generate_postgres_dump__(*args, **kwargs)
        self.__generate_tar_from_statics__(*args, **kwargs)
        self.stdout.write("Generating backup directory")

    def __generate_postgres_dump__(self, *args, **kwargs):
        self.stdout.write("generating dump from unbgames database")
        os.system('pg_dump funbox -U postgres > unbgames_db_bkp')

    def __generate_tar_from_statics__(self, *args, **kwargs):
        self.stdout.write("generating tar from statics")
        os.system('tar -zcvf teste.tar.gz ')

