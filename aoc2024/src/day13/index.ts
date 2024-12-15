import run from 'aocrunner';

type ClawMachine = {
  buttonA: { x: number; y: number; cost: number };
  buttonB: { x: number; y: number; cost: number };
  prize: { x: number; y: number };
};

const parseInput = (rawInput: string): ClawMachine[] =>
  rawInput.split('\n\n').map((clawMachine) => {
    const [buttonA, buttonB, prize] = clawMachine.split('\n');

    const buttonAValues = buttonA.match(/X([+]\d+), Y([+]\d+)/);
    const buttonBValues = buttonB.match(/X([+]\d+), Y([+]\d+)/);
    const prizeValues = prize.match(/X=(\d+), Y=(\d+)/);

    return {
      buttonA: {
        x: parseInt(buttonAValues[1]),
        y: parseInt(buttonAValues[2]),
        cost: 3,
      },
      buttonB: {
        x: parseInt(buttonBValues[1]),
        y: parseInt(buttonBValues[2]),
        cost: 1,
      },
      prize: { x: parseInt(prizeValues[1]), y: parseInt(prizeValues[2]) },
    };
  });

const findLowestCostToReachPrize = (clawMachine: ClawMachine) => {
  const { buttonA, buttonB, prize } = clawMachine;

  let lowestCost = Infinity;
  const MAX_BUTTON_PUSHES = 100;
  for (let pushA = 0; pushA <= MAX_BUTTON_PUSHES; pushA++) {
    for (let pushB = 0; pushB <= MAX_BUTTON_PUSHES; pushB++) {
      const x = buttonA.x * pushA + buttonB.x * pushB;
      const y = buttonA.y * pushA + buttonB.y * pushB;

      if (x === prize.x && y === prize.y) {
        const cost = buttonA.cost * pushA + buttonB.cost * pushB;
        if (cost < lowestCost) {
          lowestCost = cost;
        }
      }
    }
  }
  return lowestCost === Infinity ? 0 : lowestCost;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const totalCost = input.reduce((acc, clawMachine) => {
    const lowestCost = findLowestCostToReachPrize(clawMachine);
    return acc + lowestCost;
  }, 0);

  return totalCost;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
        expected: 480,
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
