file = open("Day 3\\rucksack_reorganization_data.txt", "r")
rucksacks = file.readlines()

priority_total = 0

while len(rucksacks) > 0:
  first_three = rucksacks[:3]
  first_set = set(first_three[0])
  first_set.remove('\n')
  for s in first_three[1:]:
    first_set = first_set.intersection(s)
  
  letter = first_set.pop()
  if letter.isupper():
    priority_total += ord(letter) - 38 #Add the priority of the letter to the total
  else:
    priority_total += ord(letter) - 96
  
  rucksacks = rucksacks[3:] #Remove the first three rucksacks

print(priority_total)
file.close()
