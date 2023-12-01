import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function getFirstAndLastNumberCombined(input: string){
  const singlenumbers = input.match(/\d/g);
  if (!singlenumbers || singlenumbers?.length < 1){
    throw Error(singlenumbers?.toString());
  }
  const combinedNumber: string = singlenumbers[0] + singlenumbers[singlenumbers.length-1]
  return parseInt(combinedNumber)
}

function replaceWrittenNumbersWithDigits(input: string): string {
  return input
  .replaceAll('one', 'one1one')
  .replaceAll('two', 'two2two')
  .replaceAll('three', 'three3three')
  .replaceAll('four', 'four4four')
  .replaceAll('five', 'five5five')
  .replaceAll('six', 'six6six')
  .replaceAll('seven', 'seven7seven')
  .replaceAll('eight', 'eight8eight')
  .replaceAll('nine', 'nine9nine')
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rows = input.split('\n')
  const numbers = rows.map((row) => 
    getFirstAndLastNumberCombined(row)
  );
  const sum = numbers.reduce((partialSum, a) => partialSum + a, 0)

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const parsedInput = replaceWrittenNumbersWithDigits(input);
  const rows = parsedInput.split('\n')
  const numbers = rows.map((row) => 
    getFirstAndLastNumberCombined(row)
  );
  const sum = numbers.reduce((partialSum, a) => partialSum + a, 0)

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
