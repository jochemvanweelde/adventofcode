import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rows = rawInput.split("\n");

  const operators = rows[rows.length - 1].split(" ").filter(Boolean);
  const mathColumns = rows
    .slice(0, -1)
    .map((column) => column.split(" ").filter(Boolean).map(Number));

  const result = operators.reduce((prev, curr, currIndex) => {
    if (curr === "*") {
      return (
        prev +
        mathColumns.reduce((prev, column) => {
          return prev * column[currIndex];
        }, 1)
      );
    }
    if (curr === "+") {
      return (
        prev +
        mathColumns.reduce((prev, column) => {
          return prev + column[currIndex];
        }, 0)
      );
    }
  }, 0);

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `123 328  51 64 
 45 64  387 23 
  6 98  215 314 
*   +   *   +  `,
        expected: 4277556,
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
  onlyTests: false,
});
