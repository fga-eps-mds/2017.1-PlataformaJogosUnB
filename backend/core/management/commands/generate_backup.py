from django.core.management.base import BaseCommand
from django.core.management import call_command
import os

BACKUP_FOLDER = "/var/local/2017.1-PlataformaJogosUnB/backup"
STATICS_FOLDER = "/var/local/2017.1-PlataformaJogosUnB/backend/core/public"

class Command(BaseCommand):
    help = """Generate dump from unbgames database and compress medias."""

    def handle(self, *args, **kwargs):
        self.__generate_backup_directory__(*args, **kwargs)
        self.__generate_postgres_dump__(*args, **kwargs)
        self.__generate_tar_from_statics__(*args, **kwargs)

    def __generate_backup_directory__(self, *args, **kwargs):
        self.stdout.write("Generating backup directory...")
        os.system("mkdir %s" % BACKUP_FOLDER)

    def __generate_postgres_dump__(self, *args, **kwargs):
        self.stdout.write("Generating dump from unbgames database...")
        os.system('cd %s && pg_dump funbox -U postgres > unbgames_db_bkp' % BACKUP_FOLDER)

    def __generate_tar_from_statics__(self, *args, **kwargs):
        self.stdout.write("Generating tar from statics")
        os.system('cd %s && tar -zcvf unbgames_backup.tar.gz unbgames_db_bkp %s' % (BACKUP_FOLDER, STATICS_FOLDER))
