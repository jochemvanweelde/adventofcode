import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput.split(' ').map(Number);

const blinkStone = (input: number) => {
  if (input === 0) return [1];

  const stringInput = input.toString();
  if (stringInput.length % 2 === 0) {
    const firstHalf = stringInput.slice(0, stringInput.length / 2);
    const secondHalf = stringInput.slice(stringInput.length / 2);

    return [parseInt(firstHalf), parseInt(secondHalf)];
  }

  return [input * 2024];
};

const blinkListOfStones = (input: number[]) =>
  input.reduce((acc, curr) => {
    const newStone = blinkStone(curr);
    return [...acc, ...newStone];
  }, []);

const blinkStonesOptimized = (stoneMap: Map<number, number>) => {
  const newStoneMap = new Map<number, number>();

  stoneMap.forEach((amountOfStones, stoneEngraving) => {
    const newStones = blinkStone(stoneEngraving);
    newStones.forEach((newStone) => {
      if (newStoneMap.has(newStone)) {
        newStoneMap.set(newStone, newStoneMap.get(newStone) + amountOfStones);
      } else {
        newStoneMap.set(newStone, amountOfStones);
      }
    });
  });

  return newStoneMap;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let stoneMap = new Map<number, number>();
  input.forEach((stone) => {
    if (stoneMap.has(stone)) {
      stoneMap.set(stone, stoneMap.get(stone) + 1);
    } else {
      stoneMap.set(stone, 1);
    }
  });

  for (let i = 0; i < 25; i++) {
    stoneMap = blinkStonesOptimized(stoneMap);
  }

  return Array.from(stoneMap.values()).reduce((acc, curr) => acc + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let stoneMap = new Map<number, number>();
  input.forEach((stone) => {
    if (stoneMap.has(stone)) {
      stoneMap.set(stone, stoneMap.get(stone) + 1);
    } else {
      stoneMap.set(stone, 1);
    }
  });

  for (let i = 0; i < 75; i++) {
    stoneMap = blinkStonesOptimized(stoneMap);
  }

  return Array.from(stoneMap.values()).reduce((acc, curr) => acc + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
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
  // onlyTests: true, // Comment out to run on the actual input
});
