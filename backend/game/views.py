from game.models import Game
from game.serializers import GameSerializer, PackageSerializer
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.decorators import detail_route
from game.utils.issue_handler import IssueHandler
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_protect
from .forms import ReportBugForm


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.exclude(game_activated=False)
    serializer_class = GameSerializer

    @detail_route(methods=["POST"])
    def report_bug(self, request, pk=None):
        game = get_object_or_404(self.queryset)
        form_data = request.data

        if request.method == 'POST':

            title = form_data['title']
            description = form_data['description']
            official_repository = game.official_repository

            issue_handler = IssueHandler()
            issue_handler.submit_issue(title, description,
                                       official_repository)

            return HttpResponseRedirect('/games/reportbug/')

        ##else:
        ##   form = ReportBugForm()

class PackageCreateView(generics.CreateAPIView, generics.UpdateAPIView):
    serializer_class = PackageSerializer
