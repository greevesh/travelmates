import { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

interface IStartDatePickerProps {
    startDate: Date | undefined
    setStartDate: (startDate: Date | undefined) => void
    maxDate: Date | undefined
}

export default function StartDatePicker({ startDate, setStartDate, maxDate }: IStartDatePickerProps) {
	const [showStartDatePicker, setShowStartDatePicker] = useState(false)

	const handleStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (event.type === 'dismissed') {
			setStartDate(startDate)
		}
		else {
			setStartDate(selectedDate)
		}
		setShowStartDatePicker(!showStartDatePicker)
	}

	return (
		<>
			<TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
				<TextInput
					label="Start Date"
					value={startDate ? startDate.toDateString() : ''}
					editable={false}
					style={styles.input}
				/>
			</TouchableOpacity>
			{showStartDatePicker && (
				<DateTimePicker
					value={startDate || new Date()}
					mode="date"
					display="default"
					onChange={handleStartDateChange}
					onTouchCancel={() => setShowStartDatePicker(!showStartDatePicker)}
					minimumDate={new Date()}
					maximumDate={maxDate}
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