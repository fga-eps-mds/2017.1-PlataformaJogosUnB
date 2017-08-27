from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.validators import URLValidator
from smartfields import fields
from game.choices import (
    EXTENSION_CHOICES,
    ARCHITECTURE_CHOICES,
    KERNEL_CHOICES
)
from core.validators import (
    image_extension_validator,
    HELP_TEXT_IMAGES
)
from media.utils import image_attribute_resize
from game.utils.objects_manager import GameManager
import game.validators as validators
import os
import functools
from django.template.defaultfilters import filesizeformat


class Game(models.Model):

    class Meta:
        verbose_name = _('game')
        verbose_name_plural = _('games')

    PACKAGE_SUM_QUERY = "SELECT SUM(game_package.downloads) FROM "\
                        "game_package WHERE game_package.game_id = "\
                        "game_game.id"

    name = models.CharField(
        _('Name'),
        max_length=50,
        help_text=_('What\'s the name of the game?'),
    )

    cover_image = fields.ImageField(
        _('Cover Image (1920x1080 recommended)'),
        validators=[image_extension_validator],
        upload_to="images/",
        help_text=_('ASPECT RATIO EXPECTED IS 16:9 OR IMAGE WILL NOT FIT '
                    'CORRECTLY IN CARD. ' + HELP_TEXT_IMAGES),
        dependencies=[
            image_attribute_resize("slide_image", 1920, 1080),
            image_attribute_resize("card_image", 320, 180)
        ],
    )
    slide_image = fields.ImageField(null=True, blank=True)
    card_image = fields.ImageField(null=True, blank=True)

    visualization = models.BigIntegerField(default=0)

    official_repository = models.URLField(
        _('Official Repository'),
        validators=[URLValidator()],
        help_text=_('What is the official repository for this game?'),
    )

    game_activated = models.BooleanField(
        _('Active'),
        max_length=100,
        help_text=_('What\'s the status of the game?'),
        default=True
    )

    objects = GameManager()

    @property
    def downloads(self):
        packages = self.packages.all()
        return functools.reduce(self.__count_packages__, packages, 0)

    def __count_packages__(self, count, package):
        return count + package.downloads

    def __str__(self):
        return '{0}'.format(self.name)

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Game, self).save(*args, **kwargs)


class Platform(models.Model):

    class Meta:
        verbose_name = _('platform')
        verbose_name_plural = _('platforms')

    name = models.CharField(
        _('Platform name'),
        max_length=50,
        help_text=_('Name of the platform'),
    )

    extensions = models.CharField(
        _('Valid extension'),
        blank=True,
        max_length=3,
        choices=EXTENSION_CHOICES,
        default=EXTENSION_CHOICES[0][0],
        help_text=_(
            'Select the extension that will be accepted' +
            ' for the packages'),
    )

    kernel = models.CharField(
        _('Kernel name'),
        blank=True,
        max_length=20,
        choices=KERNEL_CHOICES,
        default=KERNEL_CHOICES[0][0],
        help_text=_('Type of the kernel for this platform.' +
                    ' Ex.: Linux, Windows, macOS')
    )

    @staticmethod
    def get_platform_extensions():
        return list(
            set(platform.extensions for platform in Platform.objects.all())
        )

    def save(self, *args, **kwargs):
        self.clean_fields()
        super(Platform, self).save(*args, **kwargs)
        self.update_relationships()

    def __str__(self):
        return '{0} (.{1})'.format(self.name, self.extensions.title().lower())

    def update_relationships(self):
        for package in Package.objects.filter(
                platforms__extensions=self.extensions):
            package.platforms.add(self)


class Package(models.Model):

    class Meta:
        verbose_name = _('package')
        verbose_name_plural = _('packages')

    package = models.FileField(
        _('Package'),
        blank=True,
        upload_to='packages/',
        validators=[validators.validate_package_size,
                    validators.package_extension_validator],
        help_text=_('Choose the game\'s package')
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

    downloads = models.BigIntegerField(default=0)

    architecture = models.CharField(
        _('Architecture'),
        blank=True,
        max_length=40,
        choices=ARCHITECTURE_CHOICES,
        default=ARCHITECTURE_CHOICES[0][0],
        help_text=_('Indicate the name of architecture of package.' +
                    ' Ex.: arm, x86, x32'
                    ),
    )

    def fill_platforms(self):
        extension = os.path.splitext(self.package.name)[1][1:].lower()
        platforms = Platform.objects.filter(extensions=extension)
        for platform in platforms:
            self.platforms.add(platform)

    @property
    def size(self):
        return filesizeformat(self.package.size)

    def clean(self):
        validators.package_extension_validator(self.package)

    def save(self, *args, **kwargs):
        self.clean()
        self.clean_fields()
        super(Package, self).save(*args, **kwargs)
        self.fill_platforms()

    def __str__(self):
        return '{0} ({1})'.format(
            self.game.name,
            os.path.splitext(self.package.name)[1]
        )
