import { ScratchCard } from './types';
import run from 'aocrunner';

const parseInput = (rawInput: string) =>
  rawInput.replaceAll(/ +/g, ' ').split('\n').map((card): ScratchCard => {
    const [cardInfo, numbers] = card.trim().split(':');
    const cardId = parseInt(cardInfo.trim().split(' ')[1]);
    const [winningNumbers, myNumbers] = numbers.trim().split('|');
    return {
      id: cardId,
      winningNumbers: winningNumbers.trim()
        .split(' ')
        .map((number) => parseInt(number)),
      myNumbers: myNumbers.trim().split(' ').map((number) => {
        const nn = parseInt(number)
        if (isNaN(nn)){
          throw new Error('HO!')
        }
        return nn
      }),
    };
  });

function countCommonItems(array1: number[], array2: number[]): number {
  return array1.filter(item => array2.includes(item)).length;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let winSum = 0;
  input.forEach((scratchCard) => {
    const totalMatchingNumbers = countCommonItems(scratchCard.winningNumbers, scratchCard.myNumbers)

    if (totalMatchingNumbers > 0){
      winSum += 2**(totalMatchingNumbers-1)
    }
  });

  return winSum;
};

//Waiting for the next big bang to happen.
const oldPart2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const cardList = input.slice();

  let winSum = 0
  while(cardList.length > 0){
    const card = cardList.shift();
    winSum += 1;

    const totalMatchingNumbers = countCommonItems(card!.winningNumbers, card!.myNumbers) //We know card cannot be undefined.

    if (totalMatchingNumbers){
      cardList.push(...input.slice(card!.id, card!.id + totalMatchingNumbers));
    }
  }

  return winSum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const cardList = Array.apply(null, Array(input.length)).map(() => 1)

  input.forEach((card) => {
    const totalMatchingNumbers = countCommonItems(card.winningNumbers, card.myNumbers)

    for (let i = 0; i < totalMatchingNumbers; i++){
      // console.log(`card ${card.id} appends ${cardList[card.id-1]} cards to card ${card.id+i}`)
      cardList[card.id+i] += cardList[card.id-1]
    }
  })
  
  const sum = cardList.reduce((a, b) => a + b, 0);
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
