import run from 'aocrunner';
import { randomUUID } from 'crypto';

type GardenPlotNode = {
  x: number;
  y: number;
  plant: string;
  cornerAmount?: number;
  corners?: {
    top: boolean;
    left: boolean;
    right: boolean;
    bottom: boolean;
  };
  regionId?: string;
};

const parseInput = (rawInput: string): GardenPlotNode[][] =>
  rawInput
    .split('\n')
    .map((line, y) => line.split('').map((plant, x) => ({ x, y, plant })));

const getAdjacentNodes = (
  garden: GardenPlotNode[][],
  node: GardenPlotNode,
): GardenPlotNode[] =>
  [
    garden[node.y - 1]?.[node.x],
    garden[node.y + 1]?.[node.x],
    garden[node.y]?.[node.x - 1],
    garden[node.y]?.[node.x + 1],
  ].filter(Boolean);

const getCornerAmount = (garden: GardenPlotNode[][], node: GardenPlotNode) => {
  const expectedCornerAmount = 4;

  const otherAdjacentPlots = getAdjacentNodes(garden, node).filter(
    (adjacentNode) => adjacentNode.plant === node.plant,
  );

  return expectedCornerAmount - otherAdjacentPlots.length;
};

const getCornerAmountForPart2 = (
  garden: GardenPlotNode[][],
  node: GardenPlotNode,
) => {
  const topNode = garden[node.y - 1]?.[node.x];
  const bottomNode = garden[node.y + 1]?.[node.x];
  const leftNode = garden[node.y]?.[node.x - 1];
  const rightNode = garden[node.y]?.[node.x + 1];

  node.corners = {
    top: topNode?.plant !== node.plant,
    bottom: bottomNode?.plant !== node.plant,
    left: leftNode?.plant !== node.plant,
    right: rightNode?.plant !== node.plant,
  };

  const relevantNodes = [topNode, bottomNode, leftNode, rightNode].filter(
    (someNode) => someNode?.plant === node.plant,
  );

  let cornerAmount = 0;

  for (const corner in node.corners) {
    if (node.corners[corner as keyof typeof node.corners]) {
      const isCornerSet = relevantNodes.some(
        (relevantNode) =>
          relevantNode?.corners?.[corner as keyof typeof node.corners],
      );
      if (!isCornerSet) {
        cornerAmount++;
      }
    }
  }

  return cornerAmount;
};

const exploreCorners = (garden: GardenPlotNode[][], isPart2?: boolean) => {
  for (let y = 0; y < garden.length; y++) {
    for (let x = 0; x < garden[y].length; x++) {
      const node = garden[y][x];
      if (isPart2) {
        node.cornerAmount = getCornerAmountForPart2(garden, node);
      } else {
        node.cornerAmount = getCornerAmount(garden, node);
      }
    }
  }
};

const exploreRegion = (
  garden: GardenPlotNode[][],
  node: GardenPlotNode,
  regionId?: string,
) => {
  if (node.regionId) return;

  regionId = regionId || randomUUID();
  node.regionId = regionId;

  getAdjacentNodes(garden, node)
    .filter((adjecentNode) => adjecentNode.plant === node.plant)
    .forEach((adjacentNode) => exploreRegion(garden, adjacentNode, regionId));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  input.forEach((row) => row.forEach((node) => exploreRegion(input, node)));

  const regionMap = new Map<
    string,
    {
      plotAmount: number;
      cornerAmount: number;
    }
  >();

  exploreCorners(input);

  input.flat().forEach((node) => {
    const region = regionMap.get(node.regionId!);
    if (!region) {
      regionMap.set(node.regionId!, {
        plotAmount: 1,
        cornerAmount: node.cornerAmount!,
      });
    } else {
      region.plotAmount++;
      region.cornerAmount += node.cornerAmount!;
    }
  });

  return Array.from(regionMap.values()).reduce(
    (acc, region) => acc + region.plotAmount * region.cornerAmount,
    0,
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  exploreCorners(input, true);

  input.forEach((row) =>
    row.forEach((node) => exploreRegion(input, node, undefined)),
  );

  const regionMap = new Map<
    string,
    {
      plotAmount: number;
      cornerAmount: number;
    }
  >();

  input.flat().forEach((node) => {
    const region = regionMap.get(node.regionId!);
    if (!region) {
      regionMap.set(node.regionId!, {
        plotAmount: 1,
        cornerAmount: node.cornerAmount!,
      });
    } else {
      region.plotAmount++;
      region.cornerAmount += node.cornerAmount!;
    }
  });

  return Array.from(regionMap.values()).reduce(
    (acc, region) => acc + region.plotAmount * region.cornerAmount,
    0,
  );
};

run({
  part1: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 140,
      },
      {
        input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
        expected: 772,
      },
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1930,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 80,
      },
      {
        input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
        expected: 436,
      },
      {
        input: `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`,
        expected: 236,
      },
      {
        input: `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`,
        expected: 368,
      },
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1206,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true, // Comment out to run on the actual input
});
