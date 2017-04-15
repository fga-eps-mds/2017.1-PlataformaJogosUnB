from game.models import Game
from game.serializers import GameSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import redirect


@api_view(['GET', 'POST'])
def game_list(request, format=None):
    """
    List all games, or register a new one.
    """
    print(request.META['HTTP_USER_AGENT'])

    queryset = Game.objects.all()

    if request.method == 'GET':
        if request.accepted_renderer.format == 'html':
            data = {'games': queryset}
            return Response(data, template_name='game/list.html')
        elif request.accepted_renderer.format == "json" or "api":
            serializer = GameSerializer(queryset, many=True)
            data = serializer.data
            return Response(data)

        return Response({}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':
        serializer = GameSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            if request.accepted_renderer.format == 'json' or 'api':
                data = serializer.data
                return redirect(data, status=status.HTTP_201_CREATED)

            else:
                return Response({}, status=status.HTTP_404_NOT_FOUND)

        errors = serializer.errors
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def game_detail(request, pk, format=None):
    """
    Retrieve, update or delete a game instance.
    """
    try:
        game = Game.objects.get(pk=pk)
    except Game.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    print(pk)
    if request.method == 'GET':
        if request.accepted_renderer.format == 'html':
            data = {'game': game}
            return Response(data, template_name='game/show.html')
        elif request.accepted_renderer.format == "json" or "api":
            serializer = GameSerializer(game)
            return Response(serializer.data)
        return Response({}, status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == 'PUT':
        serializer = GameSerializer(game, data=request.data)

        if serializer.is_valid():
            serializer.save()

            if request.accepted_renderer.format == 'json' or 'api':
                data = serializer.data
                return Response(data, status=status.HTTP_200_OK)

            else:
                return Response({}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        game.delete()
        queryset = Game.objects.all()

        if request.accepted_renderer.format == 'json' or 'api':
            serializer = GameSerializer(queryset, many=True)
            data = serializer.data
            return Response(data)

        return Response({}, status=status.HTTP_404_NOT_FOUND)
