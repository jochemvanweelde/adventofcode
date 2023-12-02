import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type wire = string
type signal = number
type operation = string
const wireMap = new Map<wire, signal>()

function not(n: number){
  return ~n & 0xFFFF
}

function rightShift(n: number, s: number){
  return n >> s
}

function leftShift(n: number, s: number){
  return n << s
}

function and(n: number, s: number){
  return n & s
}

function or(n: number, s: number){
  return n | s
}


function solveOperation(operation: operation, result_wire: wire): void {
  const parts = operation.split(' ')
  if (parts.length === 1){ //Direct value
    const value = parseInt(parts[0]);
    if (isNaN(value)){
      throw new Error('Invalid operation')
    }
    wireMap.set(result_wire, value)
  }
  else if(parts.length === 2){ //NOT operator
    const value = parseInt(parts[1])
    if (isNaN(value)){
      throw new Error('Invalid operation')
    }
    wireMap.set(result_wire, not(value))
  }
  else if(parts.length === 3){
    const [value1, operator, value2] = parts
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const instructions = input.split('\n')
  instructions.forEach(instruction => {
    const [operation, result_wire] = instruction.split(' -> ')
    solveOperation(operation, result_wire);
  })
  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        123 -> x
        456 -> y
        x AND y -> d
        x OR y -> e
        x LSHIFT 2 -> f
        y RSHIFT 2 -> a
        NOT x -> h
        NOT y -> i`,
        expected: 114,
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
