from enum import Enum

class Choice(Enum):
  ROCK: int = 1
  PAPER: int = 2
  SCISSORS: int = 3
    
class Result(Enum):
  WIN: int = 6
  DRAW: int = 3
  LOSE: int = 0

class RockPaperScissorGame:
  def __init__(self, game_data: str) -> None:
    # game data is a string like this "A X"
    # Where A B C are the moves of elves and X Y Z tells me if i should win, lose or draw
    moves: list[str] = game_data.split(" ")
    self.move_elf: Choice = self.letter_to_move(moves[0])
    self.move_me: Result = self.letter_to_result(moves[1])
    
  def letter_to_move(self, move: str) -> Choice:
    if move == "A":
      return Choice.ROCK
    elif move == "B":
      return Choice.PAPER
    elif move == "C":
      return Choice.SCISSORS
    
  def letter_to_result(self, result: str) -> Result:
    if result == "X":
      return Result.LOSE
    elif result == "Y":
      return Result.DRAW
    elif result == "Z":
      return Result.WIN
    
  def play(self) -> int:
    # Returns the amount of points I get
    # 1 point if i played rock, 2 points if i played paper, 3 points if i played scissors
    # and 0 points if i lose, 3 points if i draw and 6 points if i win
    points = self.move_me.value
    if self.move_me == Result.DRAW:
      points += self.move_elf.value # Playing the same results in the same points
    elif self.move_me == Result.LOSE:
      if self.move_elf == Choice.ROCK:
        points += Choice.SCISSORS.value
      elif self.move_elf == Choice.PAPER:
        points += Choice.ROCK.value
      elif self.move_elf == Choice.SCISSORS:
        points += Choice.PAPER.value
    else:
      if self.move_elf == Choice.ROCK:
        points += Choice.PAPER.value
      elif self.move_elf == Choice.PAPER:
        points += Choice.SCISSORS.value
      elif self.move_elf == Choice.SCISSORS:
        points += Choice.ROCK.value
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