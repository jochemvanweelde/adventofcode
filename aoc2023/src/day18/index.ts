import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

class DynamicMap {
  private map: string[][] = [];

  add(x: number, y: number, value: string): void {
    while (this.map.length <= y) {
      this.map.push([]);
    }

    this.map.forEach((row) => {
      while (row.length <= x) {
        row.push('.');
      }
    });

    this.map[y][x] = value;
  }

  printMap(): void {
    this.map.forEach((row) => {
      console.log(row.join(''));
    });
  }

  fillInside(x: number, y: number): void {
    const queue: { x: number; y: number }[] = [];
    const visited: Set<string> = new Set();

    const isValid = (x: number, y: number): boolean => {
      if (x < 0 || y < 0 || x >= this.map[0].length || y >= this.map.length) {
        return false; // Out of bounds
      }
      if (this.map[y][x] === '#') {
        return false; // Cannot cross '#'
      }
      return true;
    };

    const enqueue = (x: number, y: number): void => {
      const key = `${x},${y}`;
      if (!visited.has(key)) {
        queue.push({ x, y });
        visited.add(key);
      }
    };

    const fill = (x: number, y: number): void => {
      if (!isValid(x, y)) {
        return;
      }

      this.map[y][x] = '0';

      enqueue(x, y - 1); // Up
      enqueue(x, y + 1); // Down
      enqueue(x - 1, y); // Left
      enqueue(x + 1, y); // Right
    };

    fill(x, y);

    while (queue.length > 0) {
      const { x, y } = queue.shift()!;
      fill(x, y);
    }
  }

  digCount(): number {
    return this.map.reduce((acc, row) => {
      return acc + row.filter((cell) => cell !== '.').length;
    }, 0);
  }
}

type DigOrder = {
  direction: 'U' | 'D' | 'L' | 'R';
  amount: number;
  color: number; // hex
};

function getDigOrders(input: string): DigOrder[] {
  return input.split('\n').map((line) => {
    const [direction, amount, color] = line.split(' ');
    return {
      direction: direction as 'U' | 'D' | 'L' | 'R',
      amount: parseInt(amount),
      color: parseInt(color.slice(2, 8), 16),
    };
  });
}

function dig(digMap: DynamicMap, digOrders: DigOrder[]) {
  // const currentPos = { x: 0, y: 0 }; // Test case
  const currentPos = { x: 242, y: 233 }; // Real input

  for (const order of digOrders) {
    switch (order.direction) {
      case 'U':
        for (let i = 0; i < order.amount; i++) {
          currentPos.y--;
          digMap.add(currentPos.x, currentPos.y, '#');
        }
        break;
      case 'D':
        for (let i = 0; i < order.amount; i++) {
          currentPos.y++;
          digMap.add(currentPos.x, currentPos.y, '#');
        }
        break;
      case 'L':
        for (let i = 0; i < order.amount; i++) {
          currentPos.x--;
          digMap.add(currentPos.x, currentPos.y, '#');
        }
        break;
      case 'R':
        for (let i = 0; i < order.amount; i++) {
          currentPos.x++;
          digMap.add(currentPos.x, currentPos.y, '#');
        }
        break;
    }
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const digOrders = getDigOrders(input);
  // console.log(digOrders);

  const digMap = new DynamicMap();

  dig(digMap, digOrders);
  // digMap.printMap();

  // digMap.fillInside(1, 1); // test case
  digMap.fillInside(1, 90); // real input

  // console.log('---');
  // digMap.printMap();

  return digMap.digCount();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`,
        expected: 62,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
