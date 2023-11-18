from typing import List, Optional


class Tree:
    def __init__(self, height: int):
        self.height: int = height
        
        self.heighest_tree_north: int = -1
        self.heighest_tree_south: int = -1
        self.heighest_tree_east: int = -1
        self.heighest_tree_west: int = -1
        self.is_visible: bool = True
        
    def __str__(self):
        return str(self.height)
    
    def __repr__(self):
        return str(self.height)
    
    def get_visibility(self) -> bool:
        # Returns True if the tree is visible frome one of the four directions
        return self.height > min(self.heighest_tree_north, self.heighest_tree_south, self.heighest_tree_east, self.heighest_tree_west)
    
class TreeMap:
    def __init__(self):
        self.tree_map: List[List[Tree]] = []
        
    def __str__(self) -> str:
        return str(self.tree_map)
    
    def __repr__(self) -> str:
        return str(self.tree_map)
    
    def generate_tree_map_from_file(self, file_path: str):
        with open(file_path, 'r') as file:
            # Generate a Tree for each single digit in the file
            # This will result in a 2d array of trees
            self.tree_map: List[List[Tree]] = [[Tree(int(digit)) for digit in line if digit.isdigit()] for line in file]
    
    def set_heighest_trees_from_west(self):
        for line in self.tree_map:
            heighest_tree = -1
            for tree in line:
                tree.heighest_tree_west = heighest_tree
                heighest_tree = max(heighest_tree, tree.height)
                
    def set_heighest_trees_from_east(self):
        for line in self.tree_map:
            heighest_tree = -1
            for tree in reversed(line):
                tree.heighest_tree_east = heighest_tree
                heighest_tree = max(heighest_tree, tree.height)
                
    def set_heighest_trees_from_north(self):
        for i in range(len(self.tree_map)):
            heighest_tree = -1
            for line in self.tree_map:
                tree = line[i]
                tree.heighest_tree_north = heighest_tree
                heighest_tree = max(heighest_tree, tree.height)
                
    def set_heighest_trees_from_south(self):
        for i in range(len(self.tree_map)):
            heighest_tree = -1
            for line in reversed(self.tree_map):
                tree = line[i]
                tree.heighest_tree_south = heighest_tree
                heighest_tree = max(heighest_tree, tree.height)
                
    def convert_to_tree_nodes(self) -> List[List['TreeNode']]:
        tree_nodes = [[TreeNode(tree) for tree in line] for line in self.tree_map]
        
        for i in range(len(tree_nodes)):
            for j in range(len(tree_nodes[i])):
                tree_node = tree_nodes[i][j]
                
                if i > 0:
                    tree_node.north = tree_nodes[i - 1][j]
                if j < len(tree_nodes[i]) - 1:
                    tree_node.east = tree_nodes[i][j + 1]
                if i < len(tree_nodes) - 1:
                    tree_node.south = tree_nodes[i + 1][j]
                if j > 0:
                    tree_node.west = tree_nodes[i][j - 1]
                    
        return tree_nodes
                
    def check_visibility(self) -> int:
        self.set_heighest_trees_from_west()
        self.set_heighest_trees_from_east()
        self.set_heighest_trees_from_north()
        self.set_heighest_trees_from_south()
        
        # Print visible trees with x and invisible trees with o
        for line in self.tree_map:
            for tree in line:
                if tree.get_visibility():
                    print('x', end='')
                else:
                    print('o', end='')
            print()
        
        visibility_counter = 0
        
        for line in self.tree_map:
            for tree in line:
                visibility_counter += int(tree.get_visibility())
                
        return visibility_counter

class TreeNode():
    def __init__(self, tree) -> None:
        self.tree: Tree = tree
        self.north: Optional[TreeNode] = None
        self.east: Optional[TreeNode] = None
        self.south: Optional[TreeNode] = None
        self.west: Optional[TreeNode] = None
        
    def look_west(self, looking_height: int) -> int:
        # Returns the amount of trees that are visible to the left from a Tree
        if self.west is None:
            return 0
        elif looking_height > self.west.tree.height:
            return 1 + self.west.look_west(looking_height)
        return 1
    
    def look_east(self, looking_height: int) -> int:
        # Returns the amount of trees that are visible to the right from a Tree
        if self.east is None:
            return 0
        elif looking_height > self.east.tree.height:
            return 1 + self.east.look_east(looking_height)
        return 1
    
    def look_north(self, looking_height: int) -> int:
        # Returns the amount of trees that are visible to the top from a Tree
        if self.north is None:
            return 0
        elif looking_height > self.north.tree.height:
            return 1 + self.north.look_north(looking_height)
        return 1
    
    def look_south(self, looking_height: int) -> int:
        # Returns the amount of trees that are visible to the bottom from a Tree
        if self.south is None:
            return 0
        elif looking_height > self.south.tree.height:
            return 1 + self.south.look_south(looking_height)
        return 1
    
    def get_visibility_score(self) -> int:
        # Returns the visibility score of a Tree
        looking_height = self.tree.height
        return self.look_west(looking_height) * self.look_east(looking_height) * self.look_north(looking_height) * self.look_south(looking_height)

if __name__ == '__main__':
    tree_map = TreeMap()
    tree_map.generate_tree_map_from_file('Day 8\\tree_top_tree_house.txt')
    
    # PART 1
    print(tree_map.check_visibility())
    
    # PART 2
    tree_nodes = tree_map.convert_to_tree_nodes()
    for line in tree_nodes:
        for tree_node in line:
            print(tree_node.get_visibility_score(), end=' ')
        print()
    
    print(max([max([tree_node.get_visibility_score() for tree_node in line]) for line in tree_nodes]))
