import { View, StyleSheet, TextInput } from 'react-native'
import { Calendar, DateData } from 'react-native-calendars'
import { useTripStore } from '@/stores/useTripStore'
import { useEffect, useState } from 'react'
import { formatDate, getThreeYearsFromToday, isoFormatDate } from '@/utils/dates'
import useDisableDates from '@/hooks/useDisableDates'
import WithModal from '../hoc/WithModal'

export default function StartDatePicker() {
	const [visible, setVisible] = useState(false)
	const disabledDates = useDisableDates()

	const { startDate, setStartDate, endDate } = useTripStore((state) => ({
		startDate: state.startDate,
		setStartDate: state.setStartDate,
		endDate: state.endDate,
	}))

	const handleDateSelect = (date: DateData) => {
		setStartDate(new Date(date.dateString))
		setVisible(false)
	}

	useEffect(() => {
		console.log('start date: ', startDate)
	}, [startDate])

	return (
		<View>
			<TextInput 
				onPress={() => setVisible(true)} 
				placeholder={startDate ? formatDate(startDate) : formatDate(new Date())} 
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
		marginLeft: 10,
		marginTop: 12,
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#f0f0f0',
	},
})