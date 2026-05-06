import { View, StyleSheet, TextInput } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import { useTripStore } from '@/stores/useTripStore'
import { useEffect, useState } from 'react'
import { formatDate, getThreeYearsFromToday, isoFormatDate } from '@/utils/dates'
import useDisableDates from '@/hooks/useDisableDates'
import WithModal from '../hoc/WithModal'
import { Icon } from 'react-native-paper'

export default function StartDatePicker() {
	const [visible, setVisible] = useState(false)
	const disabledDates = useDisableDates()

	const { startDate, setStartDate, endDate, tripDates } = useTripStore((state) => ({
		startDate: state.startDate,
		setStartDate: state.setStartDate,
		endDate: state.endDate,
		tripDates: state.tripDates
	}))

	const getEarliestAvailableDate = () => {
		if (!endDate) return undefined

        const latestDisabledDate = tripDates.findLast((date) => new Date(date) < endDate)
        const earliestAvailableDate = latestDisabledDate && new Date(latestDisabledDate).setDate(new Date(latestDisabledDate).getDate() + 1)
        if (earliestAvailableDate) {
            return new Date(earliestAvailableDate).toDateString()
        }
        return undefined
    }

	const minDate = getEarliestAvailableDate() || isoFormatDate(new Date())
	const maxDate = isoFormatDate(endDate) || isoFormatDate(getThreeYearsFromToday())

	const handleDateSelect = (date: DateData) => {
		setStartDate(new Date(date.dateString))
		setVisible(false)
	}

	useEffect(() => {
		if (__DEV__) console.log('start date: ', startDate)
	}, [startDate])

	return (
		<View>
			<View style={styles.inputContainer}>
				<TextInput 
					onPress={() => setVisible(true)} 
					placeholder={startDate ? formatDate(startDate) : formatDate(new Date())} 
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