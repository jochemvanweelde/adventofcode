from typing import List, Tuple
from copy import copy

class Vector:
    def __init__(self, x: int, y: int):
        self.x: int = x
        self.y: int = y
        self.is_visited_by_tail: bool = False
    
    def __str__(self):
        return f"({self.x}, {self.y})"
    
    def __repr__(self):
        return str(self)
    
    def __eq__(self, __value: object) -> bool:
        if isinstance(__value, Vector):
            return self.x == __value.x and self.y == __value.y
        raise NotImplementedError
    
    def __add__(self, other: 'Vector') -> 'Vector':
        return Vector(self.x + other.x, self.y + other.y)
    
    def __hash__(self) -> int:
        return hash((self.x, self.y))

    def is_connected(self, other: 'Vector'):
        # Returns True if the other coordinate is connected vertically, horizontally or diagonally
        return abs(self.x - other.x) <= 1 and abs(self.y - other.y) <= 1
    
    def step_towards(self, other: 'Vector') -> None:
        # If on the same row, move horizontally
        if self.y == other.y:
            if self.x < other.x:
                self.x += 1
            else:
                self.x -= 1
        # If on the same column, move vertically
        elif self.x == other.x:
            if self.y < other.y:
                self.y += 1
            else:
                self.y -= 1
        # If not on the same row or column, move diagonally
        else:
            if self.x < other.x:
                self.x += 1
            else:
                self.x -= 1
            if self.y < other.y:
                self.y += 1
            else:
                self.y -= 1
    
class Simulator:
    def __init__(self, amount_of_knots: int):
        # self.head: Vector = Vector(0, 0)
        # self.tail: Vector = Vector(0, 0)
        self.rope: List[Vector]  = [Vector(0,0) for _ in range(amount_of_knots)]
        
        self.visited_coordinates_by_tail: List[Vector] = [Vector(0,0)]
        self.all_moves: List[Vector] = []
        
    def move_knots_if_needed(self):
        for i in range(len(self.rope)):
            if i != 0 and not self.rope[i].is_connected(self.rope[i-1]):
                self.rope[i].step_towards(self.rope[i-1])
        self.visited_coordinates_by_tail.append(copy(self.rope[-1]))
            
    def generate_moves_from_file(self, file_name: str) -> None:
        with open(file_name, "r") as file:
            # Each line contains a Letter, a space and a number
            # This represents the direction and the amount of steps in that direction
            # The directions are: L, R, U, D
            for line in file:
                direction, steps = line.split()
                for i in range(int(steps)):
                    if direction == "L":
                        self.all_moves.append(Vector(-1, 0))
                    elif direction == "R":
                        self.all_moves.append(Vector(1, 0))
                    elif direction == "U":
                        self.all_moves.append(Vector(0, 1))
                    elif direction == "D":
                        self.all_moves.append(Vector(0, -1))
    
    def simulate(self) -> int:
        for move in self.all_moves:
            self.rope[0] += move
            self.move_knots_if_needed()
        
        # print(f"Length of list is: {len(self.visited_coordinates_by_tail)}")
        # print(f"List is: {self.visited_coordinates_by_tail}")        
        # print(f"Set length is: {len(set(self.visited_coordinates_by_tail))}")
        # print(f"Set is: {set(self.visited_coordinates_by_tail)}")
        
        return len(set(self.visited_coordinates_by_tail))
    
if __name__ == "__main__":
    simulator = Simulator(amount_of_knots=10)
    simulator.generate_moves_from_file("Day 9\\rope_bridge.txt")
    print(simulator.simulate())