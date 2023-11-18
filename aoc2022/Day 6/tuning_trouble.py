file = open("Day 6\\tuning_trouble_data.txt", "r")
data = file.read()
data_list = list(data)

def part_one():
  count = 0
  while count+5 < len(data_list):
    set_of_four = set(data_list[count:count+4])
    set_of_four.add(data_list[count+4])
    if len(set_of_four) == 5:
      return(count+4)
    count += 1

def part_two():
  count = 0
  while count+14 < len(data_list):
    message = set(data_list[count:count+14])
    if len(message) == 14:
      return(count+14)
    count += 1

print(part_one())
print(part_two())
