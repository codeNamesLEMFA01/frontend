import {DiversityQueryEnum, IDiversityResponse} from "@services/types/diversity.type.ts";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
const NAMES_URL = `${BASE_URL}/names`

export const getDiversity = async ({
        startYear,
        endYear,
    }: {
    [DiversityQueryEnum.STARTYEAR]: number
    [DiversityQueryEnum.ENDYEAR]: number
}): Promise<IDiversityResponse>  => {
    const response = await fetch(`${NAMES_URL}/diversity/?start_year=${startYear}&end_year=${endYear}`)
    const data = await response.json()
    return data
}