import run from "aocrunner";

// const SCHEMATIC_WIDTH = 140
const SCHEMATIC_WIDTH = 10 // test

const parseInput = (rawInput: string) => {
  return [...rawInput].filter((char) => char != '\n');
}

function isCharNextToMatcher(index: number, input: string[], matcher: RegExp){
  const indexList = [
    index - SCHEMATIC_WIDTH - 1,
    index - SCHEMATIC_WIDTH,
    index - SCHEMATIC_WIDTH + 1,
    index - 1,
    index + 1,
    index + SCHEMATIC_WIDTH - 1,
    index + SCHEMATIC_WIDTH,
    index + SCHEMATIC_WIDTH + 1,
  ]

  return indexList.some((index) => 
    matcher.test(input[index]))
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).map((char) => {
    if (!/[0-9.]/.test(char)) {
      return '*';
    }
    return char;
  });

  let sumOfCorrectNumbers = 0
  let currentNumber = ''
  let isNextToSymbol = false;

  for (const [index, char] of input.entries()){
    const isCharNaN = isNaN(+char)
    if (isCharNaN && currentNumber != ''){
      if (isNextToSymbol){
        sumOfCorrectNumbers += parseInt(currentNumber)
      }
      currentNumber = ''
      isNextToSymbol = false;
    }
    if (!isCharNaN){
      currentNumber += char
      if (!isNextToSymbol){
        isNextToSymbol = isCharNextToMatcher(index, input, RegExp('[*]'))
      }
    }
  }

  return sumOfCorrectNumbers;
};

function getIndexesOfStars(index: number, input: string[]){
  const indexList = [
    index - SCHEMATIC_WIDTH - 1,
    index - SCHEMATIC_WIDTH,
    index - SCHEMATIC_WIDTH + 1,
    index - 1,
    index + 1,
    index + SCHEMATIC_WIDTH - 1,
    index + SCHEMATIC_WIDTH,
    index + SCHEMATIC_WIDTH + 1,
  ]

  return indexList.map((index) => input[index])
  .map((char, index) => {
    if (char == '*'){
      return indexList[index]
    }
  })
}

function findGearsAndReset(indexesOfStars: Set<number>, gears: Record<number, number[]>, currentNumber: string) {
  if (indexesOfStars) {
    indexesOfStars.forEach((starIndex) => {
      if (!gears[starIndex]) {
        gears[starIndex] = [];
      }
      gears[starIndex].push(parseInt(currentNumber));
    });
  }
  currentNumber = '';
  indexesOfStars = new Set();
  return { indexesOfStars, currentNumber };
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let gears: Record<number, number[]> = {}
  let currentNumber = ''
  let indexesOfStars: Set<number> = new Set()

  input.map((char, index) => {
    const isCharNaN = isNaN(+char)
    if (isCharNaN && currentNumber != ''){
      ({ indexesOfStars, currentNumber } = findGearsAndReset(indexesOfStars, gears, currentNumber));
    }
    if (!isCharNaN){
      currentNumber += char
      const indexesOfStarsForCurrentIndex = getIndexesOfStars(index, input)
      indexesOfStarsForCurrentIndex.forEach((starIndex) => {
        if (starIndex)
        indexesOfStars.add(starIndex)
      })
    }
  });

  let sumOfCorrectNumbers = 0
  for (const gear of Object.values(gears)){
    if (gear.length == 2){
      sumOfCorrectNumbers += gear[0] * gear[1]
    }
  }

  return sumOfCorrectNumbers;
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

