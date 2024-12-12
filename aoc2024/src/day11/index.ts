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

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = input;
  for (let i = 0; i < 25; i++) {
    console.log(`Running iteration ${i + 1}`);
    result = blinkListOfStones(result);
  }
  return result.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
