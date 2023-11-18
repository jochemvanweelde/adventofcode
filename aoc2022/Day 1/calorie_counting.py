from time import time as t

class Elf:
  def __init__(self, calories: str):
    self.total_calories = 0
    calorie_list = calories.split('\n')
    for calorie in calorie_list:
      self.total_calories += int(calorie)
      
  def __lt__(self, other: 'Elf') -> bool:
    return self.total_calories < other.total_calories

# Open file, read file and get elves
file = open('Day 1\\calorie_counting_data.txt', 'r')
data = file.read()
elves_data = data.split('\n\n')
elves = [Elf(elf) for elf in elves_data]

# PART ONE
biggest_elf = max(elves)
print("Part 1:")
print("The elf carrying the most calories is carrying:", biggest_elf.total_calories, "calories")

# PART TWO
biggest_three_elves = sorted(elves, reverse=True)[:3]
print("Part 2:")
print("The elves carrying the most calories are carrying:", biggest_three_elves[0].total_calories + 
      biggest_three_elves[1].total_calories + biggest_three_elves[2].total_calories, "calories")
