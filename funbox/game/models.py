from django.db import models

class Game(models.Model):
	name =  models.CharField(
		max_length=100,
		null=False,
		blank=False,
		help_text="Qual o nome do jogo?"
	)
	
	def save(self, *args, **kwargs):
		self.clean_fields()
		super(Game, self).save(*args, **kwargs)

	def __str__(self):
		return self.name
