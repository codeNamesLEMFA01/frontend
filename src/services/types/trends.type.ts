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
  STARTYEAR = "startYear",
  ENDYEAR = "endYear",
  TOPN = "topN",
}
