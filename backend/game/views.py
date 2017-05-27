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
    queryset = Game.objects.exclude(game_activated=False)
    serializer_class = GameSerializer

    def list(self, request, format=None):
        self.queryset = Game.objects.exclude(game_activated=False)
        for game in self.queryset:
            game.cover_image.url
            game.fetch_package()

        serializer = GameSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, format=None):
        game = get_object_or_404(self.queryset, pk=pk)
        game.get_image_url(role='slider', atribute='slider_image', many=True)
        game.fetch_package()
        game.videos = game.fetch_media('video', 'slider')

        serializer = GameSerializer(game)
        return Response(serializer.data)

    def report_bug(self, request):
        game = get_object_or_404(self.queryset)

        if request.method == 'POST':
            form = (request.POST)

            title = form['title']
            description = form['description']
            label = form['issue_label']
            official_repository = game.official_repository

            issue_handler = IssueHandler()
            issue_handler.submit_issue(title, description, label,
                                       official_repository)

            return HttpResponseRedirect('/games/reportbug/')

        else:
            form = ReportBugForm()
