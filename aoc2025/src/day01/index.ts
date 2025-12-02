import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const DIAL_SIZE = 100;
const DIAL_START_POS = 50;

function getInstructionInformation(instruction: string) {
  const [direction, ...amount] = instruction.split("");
  const amountNumber = Number(amount.join(""));

  return {
    direction,
    amount: amountNumber,
  };
}

function turnDial(dial: number, instruction: string) {
  const { direction, amount } = getInstructionInformation(instruction);

  if (direction === "L") {
    return (dial + DIAL_SIZE - (amount % DIAL_SIZE)) % DIAL_SIZE;
  } else if (direction === "R") {
    return (dial + (amount % DIAL_SIZE)) % DIAL_SIZE;
  }
}

function countZeroAction(dial: number, instruction: string) {
  const { direction, amount } = getInstructionInformation(instruction);

  const overRotateCount = Math.floor(amount / DIAL_SIZE);

  if (dial === 0) {
    return overRotateCount;
  }

  if (direction === "L" && dial - (amount % DIAL_SIZE) <= 0) {
    return overRotateCount + 1;
  } else if (direction === "R" && dial + (amount % DIAL_SIZE) >= 100) {
    return overRotateCount + 1;
  }

  return overRotateCount;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let dial = DIAL_START_POS;
  const dialResults: number[] = [];
  input.split("\n").forEach((instruction) => {
    const result = turnDial(dial, instruction);
    dial = result;
    dialResults.push(result);
  });

  const result = dialResults.reduce((prev, curr) => {
    if (curr === 0) {
      return prev + 1;
    }
    return prev;
  }, 0);

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let dial = DIAL_START_POS;
  let zeroActionCount = 0;
  input.split("\n").forEach((instruction) => {
    const result = turnDial(dial, instruction);
    zeroActionCount += countZeroAction(dial, instruction);
    dial = result;
  });

  return zeroActionCount;
};

run({
  part1: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: 6,
      },
      {
        input: `R1000`,
        expected: 10,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
