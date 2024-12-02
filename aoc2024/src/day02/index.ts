import run from 'aocrunner';
import { removeItemAtIndex } from '../utils/removeItemAtIndex.js';

const parseInput = (rawInput: string) => rawInput;

const convertInputToNumberArray = (input: string) =>
  input.split(' ').map(Number);

const isFollowingRules = (
  numberArray: number[],
  retryRecursive: boolean = false,
) => {
  if (numberArray.length < 2) return true;

  let isIncreasing = false;
  let isDecreasing = false;
  let lastUsedIndex = 0;
  const result = numberArray.every((num, index, array) => {
    lastUsedIndex = index;
    if (index === array.length - 1) return true;
    if (num < array[index + 1]) {
      if (isDecreasing) return false;
      isIncreasing = true;
    } else if (num > array[index + 1]) {
      if (isIncreasing) return false;
      isDecreasing = true;
    }

    const distance = Math.abs(num - array[index + 1]);
    return distance >= 1 && distance <= 3;
  });

  if (result) return true;
  if (!retryRecursive) return false;

  return (
    (lastUsedIndex > 0 &&
      isFollowingRules(
        removeItemAtIndex(numberArray, lastUsedIndex - 1),
        false,
      )) ||
    isFollowingRules(removeItemAtIndex(numberArray, lastUsedIndex), false) ||
    (lastUsedIndex < numberArray.length &&
      isFollowingRules(
        removeItemAtIndex(numberArray, lastUsedIndex + 1),
        false,
      ))
  );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const arrays = input.split('\n').map(convertInputToNumberArray);

  const validArrays = arrays.filter((array) => isFollowingRules(array, false));

  return validArrays.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const arrays = input.split('\n').map(convertInputToNumberArray);

  const validArrays = arrays.filter((array) => isFollowingRules(array, true));

  return validArrays.length;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true, // Comment out to run on the actual input
});
