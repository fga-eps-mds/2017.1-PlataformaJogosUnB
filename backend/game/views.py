from game.models import Game, Platform
from game.serializers import (
    GameSerializer,
    PackageSerializer,
)
from game.serializers import PlatformSerializer
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.decorators import detail_route
from rest_framework.permissions import AllowAny

from game.utils.issue_handler import IssueHandler
from django.shortcuts import render
from django.http import HttpResponseRedirect
from game.forms import ReportBugForm


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.exclude(game_activated=False)
    serializer_class = GameSerializer

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


class PackageCreateView(generics.CreateAPIView, generics.UpdateAPIView):
    serializer_class = PackageSerializer


class PlatformViewList(generics.ListAPIView):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    permission_class = (AllowAny)
