
from typing import Optional
import operator


class File:
  def __init__(self, name, size):
    self.name: str = name
    self.size: int = size

class Folder:
  def __init__(self, name: str, parent: Optional['Folder']):
    self.name: str = name
    self.files: list[File] = []
    self.folders: list['Folder'] = []
    self.size = 0
    self.parent: Optional[Folder] = parent
    
  def add_file(self, file) -> None:
    self.files.append(file)
    
  def add_folder(self, folder) -> None:
    self.folders.append(folder)
    
  def get_folder(self, name: str) -> 'Folder':
    for folder in self.folders:
      if folder.name == name:
        return folder
    return self
    
  def get_size(self) -> int:
    size = 0
    for file in self.files:
      size += file.size
    for folder in self.folders:
      size += folder.get_size()
    self.size = size
    return size

  def get_all_nested_folders_with_size(self, size: int, op) -> list['Folder']:
    '''Returns a list of all folders that have a size smaller than the given size'''
    folders = []
    if op(self.get_size(), size):
      folders.append(self)
    for folder in self.folders:
      folders += folder.get_all_nested_folders_with_size(size, op)
    return folders
  
  def print_tree(self, level: int = 0) -> None:
    '''Print the folder and file tree like this:
      /
      |__ folder1
          |__ file1.txt
          |__ file2.txt
      |__ folder2
          |__ folder3
              |__ file3.txt
    '''
    print('  ' * level + '|__ ' + self.name)
    for folder in self.folders:
      folder.print_tree(level + 1)
    for file in self.files:
      print('  ' * (level + 1) + '|__ ' + file.name)
  
class FileSystem:
  def __init__(self):
    self.root: Folder = Folder('/', None)
    self.current_folder: Folder = self.root
    
  def handle_command(self, command: str) -> None:
    # commands look like this: "$ cd folder_name"
    command_list = command.split(' ')
    if command_list[1] == 'cd':
      if command_list[2].startswith('..'):
        self.current_folder = self.current_folder.parent  # type: ignore
      else:
        self.current_folder = self.current_folder.get_folder(command_list[2])
    
  def import_folders_and_files_from_file(self, file_path: str):
    with open(file_path, 'r') as file:
      for line in file:
        if line.startswith('$'):
          self.handle_command(line)
        elif line.startswith('dir'):
          self.current_folder.add_folder(Folder(line.split(' ')[1], self.current_folder))
        else:
          file_split = line.split(' ')
          self.current_folder.add_file(File(file_split[1], int(file_split[0])))

fs = FileSystem()
fs.import_folders_and_files_from_file('Day 7\\no_space_left_on_device.txt')
fs.root.get_size()

# Part 1
folders_small = fs.root.get_all_nested_folders_with_size(100000, operator.lt)
total_size = 0
for folder in folders_small:
  total_size += folder.get_size()
print(total_size)

# Part 2
total_size = fs.root.size
disk_space = 70000000
required_space = 30000000
available_space = disk_space - total_size
space_need_deletion = required_space - available_space
folders_big_enough = fs.root.get_all_nested_folders_with_size(space_need_deletion, operator.gt)
# Get the smallest folder of the list
smallest_folder = min(folders_big_enough, key=lambda folder: folder.get_size())
print(smallest_folder.size)