import run from 'aocrunner';

type Equation = {
  numbers: number[];
  result: number;
};

const parseInput = (rawInput: string): Equation[] =>
  rawInput.split('\n').map((line) => {
    const [result, numbers] = line.split(': ');
    return {
      numbers: numbers.split(' ').map(Number),
      result: Number(result),
    };
  });

const getAllOperatorOrders = (amountOfOperators: number): string[][] => {
  const operators = ['+', '*'];
  const result: string[][] = [];
  const generate = (current: string) => {
    if (current.length === amountOfOperators) {
      result.push(current.split(''));
      return;
    }
    operators.forEach((operator) => generate(current + operator));
  };
  generate('');
  return result;
};

const hasSolution = (equation: Equation): boolean => {
  const amountOfNumbers = equation.numbers.length;
  const operators = getAllOperatorOrders(amountOfNumbers - 1);

  for (const operatorOrder of operators) {
    const numbers = [...equation.numbers];
    const result = operatorOrder.reduce((acc, operator, index) => {
      if (operator === '+') {
        return acc + numbers[index + 1];
      } else if (operator === '*') {
        return acc * numbers[index + 1];
      } else {
        throw new Error('Invalid operator');
      }
    }, numbers[0]);

    if (result === equation.result) {
      return true;
    }
  }
  return false;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const validEquations = input.filter(hasSolution);

  const sumOfAllEquations = validEquations.reduce(
    (acc, equation) => acc + equation.result,
    0,
  );

  return sumOfAllEquations;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
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
