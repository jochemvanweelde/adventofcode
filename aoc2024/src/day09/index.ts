import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const decryptString = (input: string) => {
  const result: number[][] = [];
  let count = 0;
  let isFileblock = true;
  for (const char of input) {
    const number = parseInt(char, 10);
    if (isFileblock) {
      result.push(Array(number).fill(count));
      count++;
    } else {
      if (number !== 0) result.push(Array(number).fill(NaN));
    }
    isFileblock = !isFileblock;
  }
  return result;
};

const popUntilNumber = (input: number[]) => {
  while (isNaN(input[input.length - 1])) {
    input.pop();
  }
  return input.pop();
};

const fragment = (input: number[]) => {
  const inputCopy = [...input];
  inputCopy.forEach((num, index) => {
    if (isNaN(num)) {
      inputCopy[index] = popUntilNumber(inputCopy);
    }
  });
  return inputCopy;
};

const calculateChecksum = (input: number[]) => {
  let sum = 0;
  let count = 0;
  for (const num of input) {
    sum += num * count;
    count++;
  }
  return sum;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const decrypted = decryptString(input);
  const flat = decrypted.flat(2);
  const fragmented = fragment(flat);
  const checksum = calculateChecksum(fragmented);

  return checksum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true, // Comment out to run on the actual input
});
