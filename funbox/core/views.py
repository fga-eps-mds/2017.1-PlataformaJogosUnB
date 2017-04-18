from django.shortcuts import render
from django.http import HttpResponse
from game.models import Game

def index(request):
	games = Game.objects.all()[:4]
	
	for game in games:
		game.cover_image_url(role='main', atribute='main_image', many=False)
		game.cover_image_url(role='slider', atribute='slider_image', many=False)
		game.fetch_package()

	return render(request, 'game/index.html', {'games':games})

def show(request):
    return render(request, 'game/show.html',{} )

def about(request):
    return render(request, 'game/about.html',{} )
