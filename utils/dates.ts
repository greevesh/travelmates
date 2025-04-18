import { TDate } from "@/stores/useTripStore"

export const formatDate = (date: TDate) => date?.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
export const isoFormatDate = (date: TDate) => date?.toISOString().split('T')[0]

export const getThreeYearsFromToday = () => {
    const threeYearsFromToday = new Date()
	threeYearsFromToday.setFullYear(threeYearsFromToday.getFullYear() + 3)
    return threeYearsFromToday
}