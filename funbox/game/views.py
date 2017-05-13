from game.models import Game
from game.serializers import GameSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import viewsets

from game.utils.issue_handler import IssueHandler
from django.shortcuts import render
from django.http import HttpResponseRedirect

from .forms import ReportBugForm


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def list(self, request, format=None):
        for game in self.queryset:
            game.cover_image_url(role='main', atribute='main_image',
                                 many=False)
            game.fetch_package()

        if request.accepted_renderer.format == 'html':
            data = {'games': self.queryset, }
            return Response(data, template_name='game/list.html')

        serializer = GameSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, format=None):
        game = get_object_or_404(self.queryset, pk=pk)
        game.cover_image_url(role='slider', atribute='slider_image', many=True)
        game.fetch_package()
        game.videos = game.fetch_media('video', 'slider')

        if request.accepted_renderer.format == 'html':
            data = {'game': game}
            return Response(data, template_name='game/show.html')
        serializer = GameSerializer(game)
        return Response(serializer.data)

    def report_bug(self, request):
        game = get_object_or_404(self.queryset)

        if request.method == 'POST':
            form = (request.POST)

            title = form['title']
            description = form['description']
            github_user = form['github_user']
            label = 'pjunb'
            official_repository = game.official_repository

            issue_handler = IssueHandler()
            issue_handler.submit_issue(title,description,label,official_repository)

            return HttpResponseRedirect('/games/reportbug/')

        else:
            form = ReportBugForm()

        return render(request, 'game/report_bug.html', {'form': form})
