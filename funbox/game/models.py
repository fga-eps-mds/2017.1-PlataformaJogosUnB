from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.validators import URLValidator
from game.choices import EXTENSION_CHOICES
from core.validators import (
    image_extension_validator,
    HELP_TEXT_IMAGES
)
import game.validators as validators
import os


class Game(models.Model):

    name = models.CharField(
        _('Game Name'),
        max_length=100,
        help_text=_('What\'s the name of the game?'),
    )

    cover_image = models.ImageField(
        _('Cover Image'),
        validators=[image_extension_validator],
        upload_to='images/',
        help_text=_('Image that will be put at the card. ' + HELP_TEXT_IMAGES)
    )

    version = models.CharField(
        _('Game Version'),
        max_length=20,
        validators=[validators.validate_version],
        null=True,
        blank=True,
        help_text=_('What\'s the game version?'),
    )

    official_repository = models.URLField(
        _('Official Repository'),
        validators=[URLValidator()],
        help_text=_('What is the official repository for this game?'),
    )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Game, self).save(*args, **kwargs)

    def __str__(self):
        if self.version is None:
            return self.name
        else:
            return "{0} v{1}".format(self.name,
                                     self.game_version)

    def fetch_media(self, media, role):
        return getattr(self, 'media_' + media).filter(role=role)

    def get_image_url(self, role, atribute, many):
        images_game = self.fetch_media('image', role)
        if many:
            images_urls = []
            for image in images_game.all():
                url = image.image.url
                images_urls.append(url)
            setattr(self, atribute, images_urls)
        elif len(images_game) > 0:
            image = images_game.first().image
            setattr(self, atribute, image.url)
        else:
            setattr(self, atribute, "")

    def fetch_package(self):
        packages_game = self.packages.all()
        setattr(self, 'package', packages_game)


class Platform(models.Model):

    name = models.CharField(
        _('Platform name'),
        max_length=50,
        help_text=('Name of the platform'),
    )

    extensions = models.CharField(
        _('Valid extension'),
        max_length=3,
        choices=EXTENSION_CHOICES,
        default=EXTENSION_CHOICES[0][0],
        help_text=_(
            'Select the extension that will be accepted' +
            ' for the packages'),
    )

    icon = models.ImageField(
        _('Platform Icon'),
        validators=[image_extension_validator],
        upload_to='Platform',
        help_text=_('Icon of the platform. ' + HELP_TEXT_IMAGES),
    )

    @staticmethod
    def get_platform_extensions():
        return list(
            set(platform.extensions for platform in Platform.objects.all())
        )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Platform, self).save(*args, **kwargs)

    def __str__(self):
        return '{0} (.{1})'.format(self.name, self.extensions.title().lower())


class Package(models.Model):

    package = models.FileField(
        _('Package'),
        upload_to='packages/',
        validators=[validators.validate_package_size, validators.package_extension_validator],
        help_text=('Choose the game\'s package')
    )

    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        related_name='packages'
    )

    platforms = models.ManyToManyField(
        Platform,
        related_name='platforms'
    )

    def fill_platforms(self):
        extension = os.path.splitext(self.package.name)[1][1:].lower()
        platforms = Platform.objects.filter(extensions=extension)
        for platform in platforms:
            self.platforms.add(platform)

    def clean(self):
        validators.package_extension_validator(self.package)

    def save(self, *args, **kwargs):
        self.clean()
        super(Package, self).save(*args, **kwargs)
        self.fill_platforms()

    def __str__(self):
        text = ("Invalid package." +
                " There aren't registered platforms" +
                " able to play it")

        if self.platforms.count():
            text = '{0} (.{1})'.format(
                self.game.name,
                self.platforms.first().extensions.title().lower()
            )

        return text
