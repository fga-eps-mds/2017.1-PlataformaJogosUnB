from django.shortcuts import render

def list(request):
	template_name = 'templates/game/list.html'
	return render(request, 'game/list.html')