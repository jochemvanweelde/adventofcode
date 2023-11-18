file = open("Day 2\\rock_paper_scissors_data.txt", "r")
data = file.read()
games = data.splitlines()

list_of_games = ['A', 'B', 'C']
list_of_games_me = {'X': 0, 'Y': 1, 'Z': 2}

points = 0

for game in games:
  elf, me = game.split(' ')
  me = list_of_games_me[me]
  
  points += me+1
  if list_of_games[me] == elf:
    points += 3 # draw
  elif list_of_games[me-1] == elf:
    points += 6 # win

print(points)