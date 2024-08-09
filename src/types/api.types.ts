export interface ITotalBySex {
  data: {
    [key: string]: {
      F: number
      M: number
    }
  }
  total: {
    F: number
    M: number
  }
  year: {
    start: number
    end: number
  }
}
