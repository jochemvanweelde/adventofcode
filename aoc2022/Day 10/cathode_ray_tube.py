from abc import ABC, abstractmethod, abstractproperty
from typing import List

class State:
    def __init__(self) -> None:
        self.value = 1
        
    def __add__(self, other):
        self.value += other
        return self
    
    def __mul__(self, other):
        self.value *= other
        return self
    
    def __repr__(self) -> str:
        return str(self.value)
    
    def __str__(self) -> str:
        return str(self.value)


class Operation(ABC):
    @abstractproperty
    def name(self) -> str:
        raise NotImplementedError
    
    @abstractproperty
    def cost(self) -> int:
        raise NotImplementedError
    
    @abstractmethod
    def apply(self, state: State) -> bool:
        raise NotImplementedError
    
    def __str__(self) -> str:
        return f"{self.name} {self.cost}"

class NoOperation(Operation):
    @property
    def name(self) -> str:
        return "noop"
    
    @property
    def cost(self) -> int:
        return 1
    
    def apply(self, state: State) -> bool:
        return True
    
    
class OperationAdd(Operation):
    def __init__(self, value):
        self.current_cost = self.cost
        self.value = value
    
    @property
    def name(self):
        return "addx"
    
    @property
    def cost(self):
        return 2
    
    def apply(self, state: State) -> bool:
        if self.current_cost > 1:
            self.current_cost -= 1
            return False
        state += self.value
        return True
    
class CathodeRayTube:
    def __init__(self):
        self.state: State = State()
        self.cycle: int = 0
        
        self.operations: List[Operation] = []
        self._load_operations_from_file("Day 10\\cathode_ray_tube.txt")
        self.signal_strength = 0
        # Create a 2d array of the size of the screen: 40x6
        self.screen: List[List[str]] = [['-' for _ in range(40)] for _ in range(6)]
        
        
    def _load_operations_from_file(self, path: str):
        with open(path, "r") as f:
            for line in f.readlines():
                if line.startswith("noop"):
                    self.operations.append(NoOperation())
                elif line.startswith("addx"):
                    self.operations.append(OperationAdd(int(line.split(" ")[1])))
                    
    def calculate_signal_strength(self, cycles: int):
        if (cycles + 20) % 40 == 0:
            print(f"Cycle {cycles} - state {self.state}")
            self.signal_strength += cycles * self.state.value
            
    def draw_pixel(self):
        sprite = self.state.value % 40
        cursor = self.cycle % 40 - 1
        row = (self.cycle-1) // 40
        
        self.screen[row][cursor] = '#' if abs(sprite - cursor) <= 1 else '.'
        
                    
    def run_part_1(self):
        self.cycle = 0
        while len(self.operations) > 0:
            self.cycle += 1
            self.calculate_signal_strength(self.cycle)
            
            current_operation = self.operations[0]
            if current_operation.apply(self.state):
                self.operations.pop(0)
            
        return self.signal_strength
    
    def run_part_2(self):
        self.cycle = 0
        while len(self.operations) > 0:
            self.cycle += 1
            self.draw_pixel()
            
            current_operation = self.operations[0]
            if current_operation.apply(self.state):
                self.operations.pop(0)
            
        for row in self.screen:
            print(''.join(row))
            
if __name__ == "__main__":
    crt = CathodeRayTube()
    # print(crt.run_part_1())
    crt.run_part_2()