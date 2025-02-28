import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import { useTripStore } from '../../stores/useTripStore'
import React from 'react'

export default function EndDatePicker() {
	const { startDate, endDate, setEndDate } = useTripStore((state) => ({
		startDate: state.startDate,
		endDate: state.endDate,
		setEndDate: state.setEndDate,
	}))

	const handleEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		event.type === 'dismissed' ? setEndDate(endDate) : setEndDate(selectedDate)
	}

	return (
		<>
			<DateTimePicker
				value={endDate || new Date()}
				mode="date"
				display="default"
				onChange={handleEndDateChange}
				minimumDate={startDate ?? new Date()}
			/>
		</>
	)
}