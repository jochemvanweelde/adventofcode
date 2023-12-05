export type Seed = number;

export type Range = {
  destination: number
  source: number
  length: number
}

export type ConvertMap = {
  name: string
  ranges: Range[]
}

export type FertilizerPlan = {
  seeds: Seed[]
  maps: ConvertMap[]
}

export type SeedRange = {
  begin: number
  end: number
}