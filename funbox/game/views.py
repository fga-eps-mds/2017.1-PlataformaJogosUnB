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

    games = Game.objects.all()

    for game in games:
        game.cover_image_url(role='main', atribute='main_image', many=False)
        game.fetch_package()

    if request.method == 'GET':
        if request.accepted_renderer.format == 'html':
            data = {'games': games, }
            return Response(data, template_name='game/list.html')

        elif request.accepted_renderer.format == "json" or "api":
            serializer = GameSerializer(games, many=True)
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
        game.cover_image_url(role='slider', atribute='slider_image', many=True)
        game.fetch_package
        game.videos = game.fetch_media('video', 'slider')
    except Game.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    print(game.videos.first().video.url)
    if request.method == 'GET':
        if request.accepted_renderer.format == 'html':
            data = {'game': game}
            return Response(data, template_name='game/show.html')

        elif request.accepted_renderer.format == "json" or "api":
            serializer = GameSerializer(game)
            data = serializer.data
            return Response(data)

        return Response({}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'PUT':
        serializer = GameSerializer(game, data=request.data)
        data = serializer.data

        if serializer.is_valid():
            serializer.save()

            if request.accepted_renderer.format == 'json' or 'api':
                return Response(data, status=status.HTTP_200_OK)

            else:
                return Response({}, status=status.HTTP_404_NOT_FOUND)

        return Response(data, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        game.delete()
        games = Game.objects.all()

        if request.accepted_renderer.format == 'json' or 'api':
            serializer = GameSerializer(games, many=True)
            data = serializer.data
            return Response(data)

        return Response({}, status=status.HTTP_404_NOT_FOUND)
