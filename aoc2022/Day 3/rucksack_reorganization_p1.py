file = open("Day 3\\rucksack_reorganization_data.txt", "r")
data = file.readlines()

priority_total = 0

for rucksack in data:
  left, right = rucksack[:len(rucksack)//2], rucksack[len(rucksack)//2:] #Split the rucksack into two halves
  set_right = set(right) #Convert the right half into a set
  index_same_char = next((i for i, char in enumerate(left) if char in set_right), None) #Find the first index of a character that is in both halves
  letter = left[index_same_char] #Get the letter
  if letter.isupper():
    priority_total += ord(letter) - 38 #Add the priority of the letter to the total
  else:
    priority_total += ord(letter) - 96
  
print(priority_total)
file.close()
