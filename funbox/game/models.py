from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _
import re

def validate_version(version):
	version_pattern = '^(\d+\.)*\d+$'
	if re.match(version_pattern, version) is None:
		raise ValidationError(
			_("The version characters can only be or a  '.' or a digit and can't have 2 follows '.'. Error at: %(version)s"),
			params={'version': version},
		)

class Game(models.Model):
	name =  models.CharField(
		_('Name'),
		max_length=100,
		null=False,
		blank=False,
		help_text=_("What's the name of the game?")
	)	

	game_version = models.CharField(
		_('Game version'),
                max_length=20,
		validators=[validate_version],
                null=True,
                blank=True,
                help_text=_("What's the game version")
        )
	
	def save(self, *args, **kwargs):
		self.clean_fields()
		super(Game, self).save(*args, **kwargs)

	def __str__(self):
		return self.name

class Information(models.Model):
        description = models.TextField(
		_('Description'),
                max_length=1000,
                null=False,
                blank=False,
                help_text=_("Describe your game")
        )

        launch_year = models.IntegerField(
		_('Launch year'),
                null=False,
                blank=False,
                help_text=_("Which was the year the game was launched?")
        )

