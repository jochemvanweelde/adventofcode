import run from "aocrunner";
import { ConvertMap, FertilizerPlan, Seed, SeedRange } from "./types";

const parseInput = (rawInput: string): FertilizerPlan => {
  const [seedString, ...mapList] = (rawInput + '\n').split('\n')
  const seeds = seedString.trim().split(' ').splice(1).map((seed): Seed => parseInt(seed))
  
  let convertMap: ConvertMap[] = [];
  let mapBuilder: ConvertMap = {
    name: '',
    ranges: []
  }

  mapList.forEach((row) => {
    if (row === '' && mapBuilder && mapBuilder.name ){
      convertMap.push(structuredClone(mapBuilder))
      mapBuilder.name = ''
      mapBuilder.ranges = []
    }
    else if (row.includes(':')){
      mapBuilder.name = row.split(' ')[0]
    }
    else {
      const [destination, source, length] = row.split(' ').map((number) => parseInt(number))
      if (isNaN(destination) || isNaN(source) || isNaN(length)){
        return;
      }
      mapBuilder.ranges.push({
        destination,
        source,
        length
      })
    }
  });

  return {
    seeds,
    maps: convertMap
  };

};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const newSeedValues = input.seeds.map((seed) => {
    input.maps.forEach((map) => {
      for (const {source, destination, length} of map.ranges){
        if(seed >= source && seed < source + length){
          seed += destination-source
          return;
        }
      }
    });
    return seed
  })

  return Math.min(...newSeedValues)
};

function findOverlappingRange(firstRange: SeedRange, secondRange: SeedRange): SeedRange | null{
  if (secondRange.end < firstRange.begin || secondRange.begin > firstRange.end){
    return null
  }

  const begin = Math.max(firstRange.begin, secondRange.begin)
  const end = Math.min(firstRange.end, secondRange.end)

  return {
    begin,
    end
  }
}

function removeOverlappingRange(seedRange: SeedRange, overlap: SeedRange): SeedRange[] | null {
  // The whole seedRange is moved
  if (seedRange.begin == overlap.begin && seedRange.end == overlap.end){
    return null
  }
  // The overlap range is fully inside overlap
  else if (seedRange.begin != overlap.begin && seedRange.end != overlap.end){
    return [{
      begin: seedRange.begin, 
      end: overlap.begin-1
    },
    {
      begin: overlap.end+1,
      end: seedRange.end
    }]
  }
  // Only the last part of seedRange isn't contained inside the overlap
  else if (seedRange.begin == overlap.begin){
    return [{
      begin: overlap.end+1,
      end: seedRange.end
    }]
  }
  // Only the first part of seedRange isn't contained inside the overlap
  else if (seedRange.end == overlap.end) {
    return [{
      begin: seedRange.begin,
      end: overlap.begin-1
    }]
  }
  throw new Error('This should never happen!')
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  // console.log(input)

  // Oh nvm there aren't a couple of seeds, there're millions, hundreds of millions 😱
  let seedRanges: SeedRange[] = []

  for (let i = 0; i < input.seeds.length; i += 2){
    seedRanges.push({
      begin: input.seeds[i],
      end: input.seeds[i] + input.seeds[i+1]
    })
  }

  // console.log('seedRanges', seedRanges)

  //O(N^3) 🥲
  input.maps.forEach((map) => {
    // console.log('-> new map', map.name, 'with length', map.ranges.length)
    let newSeedRanges: SeedRange[] = []
    map.ranges.forEach(({source, destination, length}) => {
      const mapRange: SeedRange = {
        begin: source,
        end: source + length
      }
      // console.log('\nnext range', mapRange)
      for (let i = 0; i < seedRanges.length; i++){
        let seedRange = seedRanges[i]
        // console.log('current seedRange', seedRange)
        
        const overlappingRange = findOverlappingRange(seedRange, mapRange)
        // console.log('overlappingRange', overlappingRange)
        if (overlappingRange){
          const newSeed: SeedRange = {
            begin: overlappingRange.begin + (destination - source),
            end: overlappingRange.end + (destination - source)
          }
          newSeedRanges.push(newSeed)
          // console.log('newSeed', newSeed, 'by adding', destination - source)

          seedRanges[i] = {begin: -1, end: -1}
          const newNonOverlappingSeedRange = removeOverlappingRange(seedRange, overlappingRange)
          if (newNonOverlappingSeedRange){
            seedRanges.push(...newNonOverlappingSeedRange)
          }
          // console.log('newNonOverlappingSeedRange', newNonOverlappingSeedRange)
        }
      }
      seedRanges = seedRanges.filter((seedRange) => seedRange.begin != -1)
    })
    seedRanges.push(...newSeedRanges)
    newSeedRanges = []
    // console.log('seedRanges', seedRanges)
  })

  return seedRanges.reduce((a , c) => {
    if (c.begin < a){
      return c.begin
    }
    return a
  }, Infinity);
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
