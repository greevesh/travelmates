import { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import { useTripStore } from '../../stores/useTripStore'

export default function EndDatePicker() {
	const [showEndDatePicker, setShowEndDatePicker] = useState(false)

	const { startDate, endDate, setEndDate } = useTripStore((state) => ({
		startDate: state.startDate,
		endDate: state.endDate,
		setEndDate: state.setEndDate,
	}))

	const handleEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (event.type === 'dismissed') {
			setEndDate(endDate)
		}
		else {
			setEndDate(selectedDate)
		}
		setShowEndDatePicker(!showEndDatePicker)
	}

	return (
		<>
			<TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
				<TextInput
					label="End Date"
					value={endDate ? endDate.toDateString() : ''}
					editable={false}
					style={styles.input}
				/>
			</TouchableOpacity>
			{showEndDatePicker && (
				<DateTimePicker
					value={endDate || new Date()}
					mode="date"
					display="default"
					onChange={handleEndDateChange}
					onTouchCancel={() => setShowEndDatePicker(!showEndDatePicker)}
					minimumDate={startDate ?? new Date()}
				/>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 50,
		width: 135,
		fontSize: 12.5,
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
		marginVertical: 10,
		marginRight: 7,
	},
})