from django.shortcuts import render

def list(request):
	template_name = 'templates/game/list.html'
	game = {}
	game_list=[]
	games = {}
	game['name']='GTA 5'
	game['image']='dummy/game-1.jpg'
	game['windows']='dummy/windows.png'
	game['linux']='dummy/linux.png'
	game['macos']='dummy/apple.png'
	game_list.append(game)
	game['name']='Battlefield 4'
	game['image']='dummy/game-2.jpg'
	game['windows']='dummy/windows.png'
	game['linux']='dummy/linux.png'
	game['macos']='dummy/apple.png'
	game_list.append(game)
	game['name']='Need for speed rivals'
	game['image']='dummy/game-3.jpg'
	game['windows']='dummy/windows.png'
	game['linux']='dummy/linux.png'
	game['macos']='dummy/apple.png'
	game_list.append(game)
	game['name']='Doom'
	game['image']='dummy/game-2.jpg'
	game['windows']='dummy/windows.png'
	game['linux']='dummy/linux.png'
	game['macos']='dummy/apple.png'
	game_list.append(game)
	game['name']='Mario'
	game['image']='dummy/game-3.jpg'
	game['windows']='dummy/windows.png'
	game['linux']='dummy/linux.png'
	game['macos']='dummy/apple.png'
	game_list.append(game)
	games['games']=game_list
	return render(request, 'game/list.html', games)