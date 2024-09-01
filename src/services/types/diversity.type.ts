export interface IDiversity {
  year: number
  F: number
  M: number
  total: number
}
export interface IInfo {
  max_diversity_year: number
  max_diversity_count: number
}
export interface IDiversityResponse {
  data: IDiversity[]
  info: IInfo
}
