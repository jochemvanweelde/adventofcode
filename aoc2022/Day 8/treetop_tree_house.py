class Tree:
    def __init__(self, height: int):
        self.height: int = height
        self.is_visible: bool = False
    
    def __str__(self):
        return str(self.height)
    
    def __repr__(self):
        return str(self.height)

class Treehouse:
    def __init__(self, file):
        with open(file) as f:
            self.data = f.read().splitlines()
        self.trees = [[] for _ in range(len(self.data))]
        
    def _generate_trees(self):
        index = 0
        for line in self.data:
            for char in line:
                self.trees[index].append(Tree(int(char)))
            index += 1
        
    def calculate_visible_trees(self):
        x = y = 0
        
        # Row checking forward
        
        pass
    
a = Treehouse('Day 8\\treetop_tree_house.txt')
a._generate_trees()

