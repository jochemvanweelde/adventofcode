import run from 'aocrunner';

const parseInput = (rawInput: string) => rawInput;

const parsePageOrders = (pages: string) =>
  pages.split('\n').map((page) => page.split('|').map(Number));

const parsePages = (pages: string) =>
  pages.split('\n').map((page) => page.split(',').map(Number));

const isCorrectOrder = (orders: number[][], pages: number[]) =>
  orders.every((order) => {
    if (order.every((o) => pages.includes(o))) {
      const indexOfFirstOrderPage = pages.indexOf(order[0]);
      const indexOfSecondOrderPage = pages.indexOf(order[1]);
      return indexOfFirstOrderPage < indexOfSecondOrderPage;
    }
    return true;
  });

const sortArrayBasedOnOrders = (orders: number[][], pages: number[]) =>
  pages.sort((a, b) => {
    const relevantOrder = orders.find(
      (order) => order.includes(a) && order.includes(b),
    );
    if (relevantOrder) {
      const indexOfFirstOrderPage = pages.indexOf(relevantOrder[0]);
      const indexOfSecondOrderPage = pages.indexOf(relevantOrder[1]);
      return indexOfFirstOrderPage - indexOfSecondOrderPage;
    }
    return 0;
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const result = input.split('\n\n');
  const pageOrders = result[0];
  const pages = result[1];

  const orders = parsePageOrders(pageOrders);
  const pagesArr = parsePages(pages);

  const correctPagesOrders = pagesArr.filter((pages) =>
    isCorrectOrder(orders, pages),
  );

  //get middle value of each correct order
  const middleValues = correctPagesOrders.map(
    (pages) => pages[((pages.length - 1) / 2).toFixed(0)],
  );

  return middleValues.reduce((acc, curr) => acc + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const result = input.split('\n\n');
  const pageOrders = result[0];
  const pages = result[1];

  const orders = parsePageOrders(pageOrders);
  const pagesArr = parsePages(pages);

  const inCorrectPagesOrders = pagesArr.filter(
    (pages) => !isCorrectOrder(orders, pages),
  );

  const sortedPages = inCorrectPagesOrders.map((pages) =>
    sortArrayBasedOnOrders(orders, pages),
  );

  //get middle value of each correct order
  const middleValues = sortedPages.map(
    (pages) => pages[((pages.length - 1) / 2).toFixed(0)],
  );

  return middleValues.reduce((acc, curr) => acc + curr, 0);
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true, // Comment out to run on the actual input
});
