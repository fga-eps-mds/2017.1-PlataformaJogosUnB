from django.shortcuts import render
from django.http import HttpResponse
from game.models import Game

def index(request):
	queryset = Game.objects.all()
	return render(request, 'game/index.html', {'games':queryset})

def show(request):
    return render(request, 'game/show.html',{} )
