import { View, StyleSheet, TextInput } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import { useTripStore } from '@/stores/useTripStore'
import { useEffect, useState } from 'react'
import { formatDate, getThreeYearsFromToday, isoFormatDate } from '@/utils/dates'
import useDisableDates from '@/hooks/useDisableDates'
import WithModal from '../hoc/WithModal'

export default function EndDatePicker() {
	const [visible, setVisible] = useState(false)
	const disabledDates = useDisableDates()

	const { startDate, endDate, setEndDate, tripDates } = useTripStore((state) => ({
		startDate: state.startDate,
		endDate: state.endDate,
		setEndDate: state.setEndDate,
		tripDates: state.tripDates
	}))

	const getLatestAvailableDate = () => {
		if (!startDate) return undefined

        const earliestDisabledDate = tripDates.find((date) => new Date(date) > startDate)
        const latestAvailableDate = earliestDisabledDate && new Date(earliestDisabledDate).setDate(new Date(earliestDisabledDate).getDate() - 1)
        if (latestAvailableDate) {
            return new Date(latestAvailableDate).toDateString()
        }
        return undefined
    }

	const minDate = startDate ? isoFormatDate(startDate) : isoFormatDate(new Date())
	const maxDate = getLatestAvailableDate() || isoFormatDate(getThreeYearsFromToday())
	const endDatePlaceholder = endDate ? formatDate(endDate) : formatDate(startDate) ? formatDate(startDate) : formatDate(new Date())

	const handleDateSelect = (date: DateData) => {
		setEndDate(new Date(date.dateString))
		setVisible(false)
	}

	useEffect(() => {
		console.log('end date: ', endDate)
	}, [endDate])

	return (
		<View>
			<TextInput 
				onPress={() => setVisible(true)} 
				placeholder={endDatePlaceholder} 
				placeholderTextColor='black'
				style={styles.input}
				readOnly 
			/>
			<WithModal
				visible={visible}
				onClose={() => setVisible(false)}
			>
				<Calendar
					onDayPress={handleDateSelect}
					markedDates={{
						...disabledDates
					}}
					minDate={minDate}
					maxDate={maxDate}
				/>
			</WithModal>
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 35,
		width: 120,
		margin: 12,
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#f0f0f0',
	}
})