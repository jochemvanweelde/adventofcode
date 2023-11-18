from pprint import pprint
import numpy as np

def get_stack_from_data(data: list[str]) -> list[list[str]]:
  stacks = [[], [], [], [], [], [], [], [], []]
  
  while data[0] != '\n':
    row = data.pop(0)
    for i in range(1, len(row), 4):
      if row[i] != ' ' and not row[i].isdigit():
        stacks[(i-1)//4].insert(0, row[i])
  data.pop(0)
  return stacks

# Part 1
def move_boxes_in_stack(stacks: list[list[str]], move_info: list[str]) -> list[list[str]]:
  for move in move_info:
    move_split = move.split(' ')
    amount, move_from, move_to = int(move_split[1]), int(move_split[3]), int(move_split[5])
    for _ in range(amount):
      stacks[move_to-1].append(stacks[move_from-1].pop())
  return stacks

# Part 2
def move_boxes_together_in_stack(stacks: list[list[str]], move_info: list[str]) -> list[list[str]]:
  for move in move_info:
    move_split = move.split(' ')
    amount, move_from, move_to = int(move_split[1]), int(move_split[3]), int(move_split[5])
    
    temp_list = []
    for _ in range(amount):
      temp_list.append(stacks[move_from-1].pop())
    for _ in range(amount):
      stacks[move_to-1].append(temp_list.pop())
    
  return stacks

def print_last_values_of_every_stack(stacks: list[list[str]]) -> None:
  for stack in stacks:
    print(stack[-1], end='')

file = open('Day 5\\supply_stacks_data.txt', 'r')
data_list = file.readlines()

data_stacks = get_stack_from_data(data_list)
pprint(data_stacks)

# Part 1
# move_boxes_in_stack(data_stacks, data_list)
# pprint(data_stacks)
# print_last_values_of_every_stack(data_stacks)

# Part 2
move_boxes_together_in_stack(data_stacks, data_list)
pprint(data_stacks)
print_last_values_of_every_stack(data_stacks)