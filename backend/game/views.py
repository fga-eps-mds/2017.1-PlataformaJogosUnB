from game.models import Game
from game.serializers import GameSerializer
# from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import detail_route

from game.utils.issue_handler import IssueHandler
from django.shortcuts import render
from django.http import HttpResponseRedirect
from game.forms import ReportBugForm


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.exclude(game_activated=False)
    serializer_class = GameSerializer

    def create(self, request):
        return super(GameViewSet, self).create(request)

    @detail_route(methods=["POST"])
    def report_bug(self, request, pk=None):
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

        return render(request, 'game/report_bug.html', {'form': form})
