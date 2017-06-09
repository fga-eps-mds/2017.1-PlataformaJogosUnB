from information.models import Rating, Information
from rest_framework.decorators import APIView
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class VoteView(APIView):

    permission_classes = (permissions.AllowAny, )

    def post(self, request, pk=None):
        information = get_object_or_404(Information,pk=pk)
        rating = Rating(vote=request.data['vote'], email_voter=request.data['email_voter'], information=information)
        try:
            rating.save()
            return Response({'status': 'vote done'}, status.HTTP_201_CREATED)
        except:
            return Response({'status': 'problem'}, status.HTTP_400_BAD_REQUEST)
