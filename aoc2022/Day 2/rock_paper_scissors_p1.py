from enum import Enum

class Choice(Enum):
    ROCK: int = 1
    PAPER: int = 2
    SCISSORS: int = 3

class RockPaperScissorGame:
  def __init__(self, game_data: str) -> None:
    # game data is a string like this "A X"
    # Where A B C are the moves of elves and X Y Z are the moves of me
    # ABC en XYZ are the moves of the elves and me respectively -> Rock, Paper, Scissors
    moves: list[str] = game_data.split(" ")
    self.move_elf: Choice = self.letter_to_move(moves[0])
    self.move_me: Choice = self.letter_to_move(moves[1])
    
  def letter_to_move(self, move: str) -> Choice:
    if move == "A" or move == "X":
      return Choice.ROCK
    elif move == "B" or move == "Y":
      return Choice.PAPER
    elif move == "C" or move == "Z":
      return Choice.SCISSORS
    
  def play(self) -> int:
    # Returns the amount of points I get
    # 1 point if i played rock, 2 points if i played paper, 3 points if i played scissors
    # and 0 points if i lose, 3 points if i draw and 6 points if i win
    points = self.move_me.value
    if self.move_me == self.move_elf:
      points += 3
    elif self.move_me == Choice.ROCK and self.move_elf == Choice.SCISSORS:
      points += 6
    elif self.move_me == Choice.PAPER and self.move_elf == Choice.ROCK:
      points += 6
    elif self.move_me == Choice.SCISSORS and self.move_elf == Choice.PAPER:
      points += 6
    return points
  
def play_all_games() -> int:
  # Get input from file
  file = open("Day 2\\rock_paper_scissors_data.txt", "r")
  data = file.read()
  games = data.splitlines()
  
  # Play all games
  total_points: int = 0
  for game in games:
    game = RockPaperScissorGame(game)
    total_points += game.play()
  return total_points

print(play_all_games())