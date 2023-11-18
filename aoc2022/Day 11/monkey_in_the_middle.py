from typing import List, Callable, Tuple

SUPER_MODULO = 5*17*7*13*19*11*3*2

def basic_monkey_throw(value: int, divider: int, success_monkey: int, fail_monkey: int) -> Tuple[int, int]:
    # new_value = int(value / 3) # PART 1
    new_value = value % SUPER_MODULO # PART 2
    if new_value % divider == 0:
        # new_value = divider
        return success_monkey, new_value
    return fail_monkey, new_value
    

class Monkey:
    def __init__(self, starting_items: List[int], inspect_operation: Callable[[int], int], throw_operation: Callable[[int], Tuple[int, int]]):
        self.items = starting_items
        self.inspect_operation = inspect_operation
        self.throw_operation = throw_operation
        self.inspect_counter = 0
        
class MonkeyBusiness:
    def __init__(self):
        self.monkeys: List[Monkey] = []
        
        self.monkeys.append(Monkey([74, 64, 74, 63, 53],                lambda x: x * 7, lambda x: basic_monkey_throw(x, 5, 1, 6))) # Monkey 0
        self.monkeys.append(Monkey([69, 99, 95, 62],                    lambda x: x * x, lambda x: basic_monkey_throw(x, 17, 2, 5))) # Monkey 1
        self.monkeys.append(Monkey([59, 81],                            lambda x: x + 8, lambda x: basic_monkey_throw(x, 7, 4, 3))) # Monkey 2
        self.monkeys.append(Monkey([50, 67, 63, 57, 63, 83, 97],        lambda x: x + 4, lambda x: basic_monkey_throw(x, 13, 0, 7))) # Monkey 3
        self.monkeys.append(Monkey([61, 94, 85, 52, 81, 90, 94, 70],    lambda x: x + 3, lambda x: basic_monkey_throw(x, 19, 7, 3))) # Monkey 4
        self.monkeys.append(Monkey([69],                                lambda x: x + 5, lambda x: basic_monkey_throw(x, 3, 4, 2))) # Monkey 5
        self.monkeys.append(Monkey([54, 55, 58],                        lambda x: x + 7, lambda x: basic_monkey_throw(x, 11, 1, 5))) # Monkey 6
        self.monkeys.append(Monkey([79, 51, 83, 88, 93, 76],            lambda x: x * 3, lambda x: basic_monkey_throw(x, 2, 0, 6))) # Monkey 7
        
        # self.monkeys.append(Monkey([79, 98],                            lambda x: x * 19, lambda x: basic_monkey_throw(x, 23, 2, 3))) # Monkey 0
        # self.monkeys.append(Monkey([54, 65, 75, 74],                    lambda x: x + 6, lambda x: basic_monkey_throw(x, 19, 2, 0))) # Monkey 0
        # self.monkeys.append(Monkey([79, 60, 97],                        lambda x: x * x, lambda x: basic_monkey_throw(x, 13, 1, 3))) # Monkey 0
        # self.monkeys.append(Monkey([74],                                lambda x: x + 3, lambda x: basic_monkey_throw(x, 17, 0, 1))) # Monkey 0
    
    def monkey_in_the_middle(self):
        for monkey in self.monkeys:
            while len(monkey.items) >= 1:
                item = monkey.items.pop(0)
                
                worried_item = monkey.inspect_operation(item)
                monkey.inspect_counter += 1
                
                new_monkey, new_item = monkey.throw_operation(worried_item)
                self.monkeys[new_monkey].items.append(new_item)
                
    def play_rounds(self, rounds = 0):
        for index in range(rounds):
            self.monkey_in_the_middle()
            print(f"Round {index} finished.")
            
            # print(f"Round {index} finished. Each monkey contains these items:")
            # for index, monkey in enumerate(self.monkeys):
            #     print(f"Monkey {index} has the following items: {monkey.items}")
            # print()
            
        for index, monkey in enumerate(self.monkeys):
            print(f"Monkey {index} has {len(monkey.items)} items and inspected {monkey.inspect_counter} items")
        print()
            
        # Get the two monkeys with the highest insepction count
        sorted_monkeys = sorted(self.monkeys, key=lambda monkey: monkey.inspect_counter, reverse=True)
        print(f"Monkey has the highest inspection count with {sorted_monkeys[0].inspect_counter}")
        print(f"Monkey has the second highest inspection count with {sorted_monkeys[1].inspect_counter}")
        print(f"Multiplied together, they have {sorted_monkeys[0].inspect_counter * sorted_monkeys[1].inspect_counter}")
    
if __name__ == "__main__":
    mb = MonkeyBusiness()
    
    # for monkey in mb.monkeys:
    #     for item in monkey.items:
    #         SUPER_MODULO *= item
            
    mb.play_rounds(10_000)