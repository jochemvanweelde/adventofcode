file = open("Day 4\\camp_cleanup_data.txt", "r")
data = file.readlines()

count_p1 = 0
count_p2 = 0

for line in data:
  left, right = line.split(',')
  left_min, left_max = left.split('-')
  right_min, right_max = right.split('-')
  
  # Part 1
  if int(left_min) <= int(right_min) and int(left_max) >= int(right_max):
    count_p1 += 1
  elif int(left_min) >= int(right_min) and int(left_max) <= int(right_max):
    count_p1 += 1
    
  # Part 2
  left_list = [i for i in range(int(left_min), int(left_max) + 1)]
  right_list = [i for i in range(int(right_min), int(right_max) + 1)]
  if set(left_list).intersection(set(right_list)):
    count_p2 += 1
      
print(count_p1)
print(count_p2) 