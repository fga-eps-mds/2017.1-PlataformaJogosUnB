from information.models import Rating, Information
from rest_framework.decorators import APIView
from rest_framework import status
from rest_framework.response import Response

class VoteView(APIView):

    def post(self, request, pk=None):
        information = get_object_or_404(Information,pk)
        rating = Rating(vote=request.POST['vote'], email_voter=request.POST['email_voter'], information=information)
        print("veio aqui porra\n\n\n\n\n\n")
        try:
            rating.save()
            return Response({}, status=status.HTTP_201_CREATED)
        except:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
