export type Card = number

export const cardToNumber = (card: string): Card => {
  switch (card) {
    case 'A': return 14;
    case 'K': return 13;
    case 'Q': return 12;
    case 'J': return 0;
    case 'T': return 10;
    default: return parseInt(card);
  }
}

export type Game = {
  cards: Card[];
  bid: number;
}

export type WinMap = {
  fiveOfAKind: Game[];
  fourOfAKind: Game[];
  fullHouse: Game[];
  threeOfAKind: Game[];
  twoPair: Game[];
  onePair: Game[];
  highCard: Game[];
}

export enum Hand {
  fiveOfAKind = 7,
  fourOfAKind = 6,
  fullHouse = 5,
  threeOfAKind = 4,
  twoPair = 3,
  onePair = 2,
  highCard = 1,
}