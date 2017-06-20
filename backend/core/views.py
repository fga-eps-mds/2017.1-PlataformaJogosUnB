from django.shortcuts import render
from game.models import Game
from django.contrib.auth.decorators import login_required


def index(request):
    games = Game.objects.all()[:4]

    for game in games:
        game.cover_image.url
        game.get_image_url(
            role='slider',
            atribute='slider_image',
            many=False)
        game.fetch_package()

    print("any route")
    return render(request, 'game/index.html', {'games': games})


def about(request):
    return render(request, 'game/about.html', {})
