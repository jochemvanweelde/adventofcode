import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const commands = input.split('\n')
  const lightsArray: boolean[][] = Array.from({length: 1000}, e => Array(1000).fill(false))

  for (const command of commands){
    let isToggle: boolean
    let turnCommand: boolean
    let commandWords = command.split(' ')
    isToggle = commandWords[0] === 'toggle'
    if (!isToggle){
      turnCommand = commandWords[1] === 'on'
    }
    commandWords = commandWords.slice(isToggle ? 1 : 2)

    const [x1, y1] = commandWords[0].split(',').map((item) => parseInt(item))
    const [x2, y2] = commandWords[2].split(',').map((item) => parseInt(item))
    
    for (let i = x1; i <= x2; i++){
      for (let j = y1; j <= y2; j++){
        lightsArray[i][j]= isToggle ? !lightsArray[i][j] : turnCommand!
      }
    }
  }

  const totalItems = () => {
    let total = 0
    lightsArray.forEach(entry => entry.forEach(entry2 => entry2 ? total += 1 : null))
    return total;
  }

  return totalItems()
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const commands = input.split('\n')
  const lightsArray: number[][] = Array.from({length: 1000}, e => Array(1000).fill(0))

  for (const command of commands){
    let isToggle: boolean
    let turnCommand: boolean
    let commandWords = command.split(' ')
    isToggle = commandWords[0] === 'toggle'
    if (!isToggle){
      turnCommand = commandWords[1] === 'on'
    }
    commandWords = commandWords.slice(isToggle ? 1 : 2)

    const [x1, y1] = commandWords[0].split(',').map((item) => parseInt(item))
    const [x2, y2] = commandWords[2].split(',').map((item) => parseInt(item))
    
    for (let i = x1; i <= x2; i++){
      for (let j = y1; j <= y2; j++){
        lightsArray[i][j]= isToggle ? lightsArray[i][j] + 2 : turnCommand! ? lightsArray[i][j] + 1 : lightsArray[i][j] - 1
        if (lightsArray[i][j] < 0) lightsArray[i][j] = 0;
      }
    }
  }

  const totalItems = () => {
    let total = 0
    lightsArray.forEach(entry => entry.forEach(entry2 => entry2 ? total += entry2 : null))
    return total;
  }

  return totalItems()
};

run({
  part1: {
    tests: [
      {
        input: `turn on 0,0 through 999,999`,
        expected: 1000000,
      },
      {
        input: `toggle 0,0 through 5,0`,
        expected: 6,
      },
      {
        input: `turn off 499,499 through 500,500`,
        expected: 0,
      },
      {
        input: `turn on 0,0 through 999,999\nturn off 499,499 through 500,500`,
        expected: 999996,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `turn on 0,0 through 0,0`,
        expected: 1,
      },
      {
        input: `toggle 0,0 through 999,999`,
        expected: 2000000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
