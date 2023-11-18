import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = 0;

  for (const char of input) {
    if (char === '(') {
      result += 1;
    } else if (char === ')') {
      result -= 1;
    }
  }
  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = 0;
  let position = 0;

  for (const char of input) {
    position += 1;
    if (char === '(') {
      result += 1;
    } else if (char === ')') {
      result -= 1;
    }
    if (result === -1) {
      return position;
    }
  }
  return position;
};

run({
  part1: {
    tests: [
      {
        input: `(())`,
        expected: 0,
      },
      {
        input: `(((`,
        expected: 3,
      },
      {
        input: `))(((((`,
        expected: 3,
      },
      {
        input: `())`,
        expected: -1,
      },
      {
        input: `)))`,
        expected: -3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `)`,
        expected: 1,
      },
      {
        input: `()())`,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
