import { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

interface IEndDatePickerProps {
    endDate: Date | undefined
    setEndDate: (endDate: Date | undefined) => void
    minDate: Date | undefined
}

export default function EndDatePicker({ endDate, setEndDate, minDate }: IEndDatePickerProps) {
	const [showEndDatePicker, setShowEndDatePicker] = useState(false)

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
					minimumDate={minDate}
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