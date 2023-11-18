import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type operation = string
type wire = string
const wireMap = new Map<wire, operation>()

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



function solveOperation(operation: operation){
  const parts = operation.split(' ')
  if (parts.length === 1){ //Direct value
    const value = parseInt(parts[0]);
    if (!isNaN(value)){
      return value
    }
    return solveOperation(wireMap.get(parts[0]) || '0')
  }
  else if(parts.length === 2){ //NOT operator
    const value = parseInt(parts[1])
    if (!isNaN(value)){
      return not(value)
    }
    return solveOperation(wireMap.get(parts[0]) || '0')
  }
  else if(parts.length === 3){
    const [value1, operator, value2] = parts

    

  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const instructions = input.split('\n')

  // Create Wire Map
  for (const instruction of instructions){
    const [operation, wire] = instruction.split(' -> ')
    wireMap.set(wire, operation)
  }

  // Solve Wire Map
  const wireToSolve = wireMap.get('a')
  if (!wireToSolve) throw Error('No wire a found!')

  

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
