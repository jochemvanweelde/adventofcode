// =====================================
// Dear viewer, I'm sorry for the mess.
// I'm not proud of this code.
// But it works.
// For part 1 at least, Part 2 is a mess, and doesn't work.
// I'm sorry.
// =====================================

import run from 'aocrunner';
import { Card, Game, Hand, WinMap, cardToNumber } from './types.js';

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map((line): Game => {
    const [cardString, bidString] = line.split(' ');
    return {
      cards: cardString.split('').map((card) => cardToNumber(card)),
      bid: parseInt(bidString),
    };
  });
};

function calculateStrongestWin(game: Game): Hand {
  // sort cards by number
  const cards = [...game.cards].sort((a, b) => a - b);

  // check for five of a kind
  if (cards[0] === cards[4]) {
    return Hand.fiveOfAKind;
  }

  // check for four of a kind
  if (cards[0] === cards[3] || cards[1] === cards[4]) {
    return Hand.fourOfAKind;
  }

  // check for full house
  if (
    (cards[0] === cards[2] && cards[3] === cards[4]) ||
    (cards[0] === cards[1] && cards[2] === cards[4])
  ) {
    return Hand.fullHouse;
  }

  // check for three of a kind
  if (
    cards[0] === cards[2] ||
    cards[1] === cards[3] ||
    cards[2] === cards[4]
  ) {
    return Hand.threeOfAKind;
  }

  // check for two pair
  if (
    (cards[0] === cards[1] && cards[2] === cards[3]) ||
    (cards[0] === cards[1] && cards[3] === cards[4]) ||
    (cards[1] === cards[2] && cards[3] === cards[4])
  ) {
    return Hand.twoPair;
  }

  // check for one pair
  if (
    cards[0] === cards[1] ||
    cards[1] === cards[2] ||
    cards[2] === cards[3] ||
    cards[3] === cards[4]
  ) {
    return Hand.onePair;
  }

  // high card
  return Hand.highCard;
}

function addHandToMap(gameToCheck: Game, game: Game, winMap: WinMap, jokers = 0) {
  let hand = calculateStrongestWin(gameToCheck);

  if (jokers === 1) {
    hand++;
  }
  if (jokers === 2) {
    if (hand === Hand.highCard) {
      hand = Hand.threeOfAKind;
    } 
    else if (hand === Hand.onePair) {
      hand = Hand.fourOfAKind;
    }
    else if (hand === Hand.threeOfAKind) {
      hand = Hand.fiveOfAKind;
    }
  }
  if (jokers === 3) {
    if (hand === Hand.highCard) {
      hand = Hand.fourOfAKind;
    }
    else {
      hand = Hand.fiveOfAKind;
    }
  }
  if (jokers >= 4) {
    hand = Hand.fiveOfAKind;
  }

  switch (hand) {
    case Hand.fiveOfAKind:
      winMap.fiveOfAKind.push(game);
      break;
    case Hand.fourOfAKind:
      winMap.fourOfAKind.push(game);
      break;
    case Hand.fullHouse:
      winMap.fullHouse.push(game);
      break;
    case Hand.threeOfAKind:
      winMap.threeOfAKind.push(game);
      break;
    case Hand.twoPair:
      winMap.twoPair.push(game);
      break;
    case Hand.onePair:
      winMap.onePair.push(game);
      break;
    case Hand.highCard:
      winMap.highCard.push(game);
      break;
  }
}

function removeJokersFromGameAndAddFakeCards(game: Game) {
  const cards = [...game.cards].sort((a, b) => a - b);

  // remove jokers
  const jokers = cards.filter((card) => card === 0);
  const nonJokers = cards.filter((card) => card !== 0);

  // add fake cards
  const fakeCards = [15, 16, 17, 18, 19].slice(0, 5 - nonJokers.length);
  const newCards = [...nonJokers, ...fakeCards];

  return {
    cards: newCards,
    jokers,
  };
}

function sortMapByHighestFirstCard(winMap: WinMap) {
  const sortFn = (a: Game, b: Game) => {
    if (a.cards[0] !== b.cards[0]) {
      return b.cards[0] - a.cards[0];
    }

    if (a.cards[1] !== b.cards[1]) {
      return b.cards[1] - a.cards[1];
    }

    if (a.cards[2] !== b.cards[2]) {
      return b.cards[2] - a.cards[2];
    }

    if (a.cards[3] !== b.cards[3]) {
      return b.cards[3] - a.cards[3];
    }

    if (a.cards[4] !== b.cards[4]) {
      return b.cards[4] - a.cards[4];
    }

    return 0;
  };

  winMap.fiveOfAKind.sort(sortFn);
  winMap.fourOfAKind.sort(sortFn);
  winMap.fullHouse.sort(sortFn);
  winMap.threeOfAKind.sort(sortFn);
  winMap.twoPair.sort(sortFn);
  winMap.onePair.sort(sortFn);
  winMap.highCard.sort(sortFn);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const winMap: WinMap = {
    fiveOfAKind: [],
    fourOfAKind: [],
    fullHouse: [],
    threeOfAKind: [],
    twoPair: [],
    onePair: [],
    highCard: [],
  };

  input.forEach((game) => addHandToMap(game, game, winMap));
  sortMapByHighestFirstCard(winMap);

  const sortedWins = winMap.fiveOfAKind.concat(
    winMap.fourOfAKind,
    winMap.fullHouse,
    winMap.threeOfAKind,
    winMap.twoPair,
    winMap.onePair,
    winMap.highCard,
  );

  let sum = 0;
  for (let i = sortedWins.length; i > 0; i--) {
    const game = sortedWins[i-1];
    sum += game.bid * (sortedWins.length+1 - i);
  }

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const winMap: WinMap = {
    fiveOfAKind: [],
    fourOfAKind: [],
    fullHouse: [],
    threeOfAKind: [],
    twoPair: [],
    onePair: [],
    highCard: [],
  };

  input.forEach((game) => {
    const { cards, jokers } = removeJokersFromGameAndAddFakeCards(structuredClone(game));
    const newGame = { cards, bid: game.bid };
    addHandToMap(newGame, game, winMap, jokers.length);
  });

  sortMapByHighestFirstCard(winMap);

  const sortedWins = winMap.fiveOfAKind.concat(
    winMap.fourOfAKind,
    winMap.fullHouse,
    winMap.threeOfAKind,
    winMap.twoPair,
    winMap.onePair,
    winMap.highCard,
  );

  console.log(sortedWins);

  let sum = 0;

  for (let i = sortedWins.length; i > 0; i--) {
    const game = sortedWins[i-1];
    sum += game.bid * (sortedWins.length+1 - i);
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
