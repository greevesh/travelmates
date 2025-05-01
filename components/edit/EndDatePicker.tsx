import { View, StyleSheet, TextInput } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import { useTripStore } from '@/stores/useTripStore'
import { useEffect, useState } from 'react'
import { formatDate, getThreeYearsFromToday, isoFormatDate } from '@/utils/dates'
import useDisableDates from '@/hooks/useDisableDates'
import WithModal from '../hoc/WithModal'
import { Icon } from 'react-native-paper'

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
			<View style={styles.inputContainer}>
				<TextInput 
					onPress={() => startDate && setVisible(true)} 
					placeholder={endDatePlaceholder} 
					placeholderTextColor='black'
					style={styles.input}
					readOnly 
				/>
				<View style={styles.iconContainer}>
					<Icon size={18} source="calendar" color='#3a9fff' />
				</View>
			</View>
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
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f9f9f9',
		borderRadius: 10,
		width: 160,
		height: 35,
		marginLeft: 10,
		marginTop: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	input: {
		flex: 1,
		padding: 10,
	},
	iconContainer: {
		marginRight: 10,
	},
})