import { useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import { useTripStore } from '../../stores/useTripStore'

export default function StartDatePicker() {
	const [showStartDatePicker, setShowStartDatePicker] = useState(false)

	const { startDate, setStartDate, endDate } = useTripStore((state) => ({
		startDate: state.startDate,
		setStartDate: state.setStartDate,
		endDate: state.endDate,
	}))

	const handleStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		event.type === 'dismissed' ? setStartDate(startDate) : setStartDate(selectedDate)
		setShowStartDatePicker(!showStartDatePicker)
	}

	return (
		<>
			<DateTimePicker
				value={startDate || new Date()}
				mode="date"
				display="default"
				onChange={handleStartDateChange}
				onTouchCancel={() => setShowStartDatePicker(!showStartDatePicker)}
				minimumDate={new Date()}
				maximumDate={endDate}
			/>
		</>
	)
}