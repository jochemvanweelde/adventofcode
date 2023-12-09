import run from 'aocrunner';
import { assert } from 'console';

const parseInput = (rawInput: string) => {
  const [directions, _, ...nodes] = rawInput.split('\n');
  const tree: Tree = {};

  nodes.forEach((node) => {
    const [nodeName, nodeValue] = node.split(' = ');
    const [left, right] = nodeValue
      .replace('(', '')
      .replace(')', '')
      .split(', ');

    tree[nodeName] = {
      left,
      right,
    };
  });

  return {
    directions: directions.split(''),
    tree,
  };
};

function findAmountOfStepsToNode(tree: Tree, nodeStart: NodeName, nodeEnd: RegExp, directions: string[]) {
  let currentNode = nodeStart;
  let stepSum = 0;

  while (true) {
    for (const direction of directions) {
      const { left, right } = tree[currentNode];

      if (direction === 'L') {
        currentNode = left;
      } else {
        currentNode = right;
      }

      stepSum += 1;

      if (RegExp(nodeEnd).test(currentNode)) {
        return stepSum;
      }
    }
  }
}
  

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return findAmountOfStepsToNode(input.tree, 'AAA', /ZZZ/, input.directions);
  
};

function assertLoopsOfSameLength(tree: Tree, nodeStart: NodeName, nodeEnd: RegExp, directions: string[]) {
  let currentNode = nodeStart;
  let stepSum = 0;
  let shouldBreak = false;

  while (true) {
    for (const direction of directions) {
      const { left, right } = tree[currentNode];

      if (direction === 'L') {
        currentNode = left;
      } else {
        currentNode = right;
      }

      stepSum += 1;

      if (RegExp(nodeEnd).test(currentNode)) {
        shouldBreak = true;
        break;
      }
    }
    if (shouldBreak) {
      break;
    }
  }

  let stepsAfterFirstFind = 0;

  while (true) {
    for (const direction of directions) {
      const { left, right } = tree[currentNode];

      if (direction === 'L') {
        currentNode = left;
      } else {
        currentNode = right;
      }

      stepsAfterFirstFind += 1;

      if (RegExp(nodeEnd).test(currentNode)) {
        console.log(stepSum, stepsAfterFirstFind);
        return stepSum === stepsAfterFirstFind;
      }
    }
  }
}

function calculateLeastCommonMultiple(numbers: number[]) {
  const max = Math.max(...numbers);
  let lcm = max;

  while (true) {
    const isDivisible = numbers.every((number) => lcm % number === 0);

    if (isDivisible) {
      return lcm;
    }

    lcm += max;
  }
}


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const nodesEndingA = Object.keys(input.tree).filter((key) => key.endsWith('A'));
  const nodesEndingZ = Object.keys(input.tree).filter((key) => key.endsWith('Z'));
  assert(nodesEndingA.length === nodesEndingZ.length, 'Number of nodes ending with A and Z should be equal');

  let stepsSums: number[] = [];

  for (const node of nodesEndingA) {
    assert(assertLoopsOfSameLength(input.tree, node, /Z$/, input.directions), 'Loops should be of same length');
    const stepsSum = findAmountOfStepsToNode(input.tree, node, /Z$/, input.directions);
    stepsSums.push(stepsSum);
  }

  console.log(stepsSums);

  return calculateLeastCommonMultiple(stepsSums);
};

run({
  part1: {
    tests: [
      {
        input: `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ`,
        expected: 2,
      },
      {
        input: `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});