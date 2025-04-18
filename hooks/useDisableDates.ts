import { useTripStore } from "@/stores/useTripStore"
import { isoFormatDate } from "@/utils/dates"

interface IMarkedDateProps {
	disabled: boolean 
	disableTouchEvent: boolean 
}

export default function useDisableDates() {
    const { tripDates } = useTripStore((state) => ({
        tripDates: state.tripDates
    }))

    const disabledDates = tripDates.length > 0 && tripDates.reduce((acc: { [key: string]: IMarkedDateProps }, date: string) => {
        const d = new Date(date)
        d.setHours(12) // Offsets timezone differences
        const formattedDate = isoFormatDate(d)
        if (formattedDate) {
            acc[formattedDate] = { 
                disabled: true, 
                disableTouchEvent: true,
            }
        }
        return acc
    }, {})

    return disabledDates
}