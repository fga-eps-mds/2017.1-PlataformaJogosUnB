from game.models import Game
from game.serializers import GameSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET', 'POST'])
def game_list(request, format=None):
    """
    List all games, or register a new one.
    """
    print(request.META['HTTP_USER_AGENT'])

    if request.method == 'GET':
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def game_detail(request, pk, format=None):
    """
    Retrieve, update or delete a game instance.
    """
    try:
        game = Game.objects.get(pk=pk)
    except Game.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GameSerializer(game)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = GameSerializer(game, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        game.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
