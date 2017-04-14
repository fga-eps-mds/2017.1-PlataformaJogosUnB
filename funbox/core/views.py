from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'game/index.html',{} )

def show(request):
    return render(request, 'game/show.html',{} )
