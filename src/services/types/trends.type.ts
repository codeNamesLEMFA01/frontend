export interface IServiceTrendsName {
  data: Record<string, { F: number; M: number; T: number }>
  name: string
  total: number
  max_year: number
  max_value: number
  by_gender: {
    F: number
    M: number
  }
}

interface ITopName {
  name: string
  years: number[]
  birth: number[]
}

export interface IServiceTrendsTopNames {
  data: {
    male: ITopName[]
    female: ITopName[]
  }
  info: {
    start_year: number
    end_year: number
    top_n: number
    top_name: {
      male: {
        name: string
        total: number
      }
      female: {
        name: string
        total: number
      }
    }
  }
}

export enum TrendsTopNamesQueryEnum {
  TOPN = "topN",
}

export interface ILengthData {
  years: number[]
  length: number[]
}
export interface IMaxLengthData {
  name: string
  sex: string
  birth: number
  year: number
  name_length: number
}

export interface IDescribeLengthData {
  count: number
  mean: number
  std: number
  min: number
  "25%": number
  "50%": number
  "75%": number
  max: number
}

export interface ITrendsLengthNameService {
  data: {
    male: ILengthData
    female: ILengthData
    global: ILengthData
  }
  meta: {
    max: {
      male: IMaxLengthData
      female: IMaxLengthData
    }
    evolution: {
      male: number
      female: number
      global: number
    }
    describe: {
      male: IDescribeLengthData
      female: IDescribeLengthData
    }
  }
}
