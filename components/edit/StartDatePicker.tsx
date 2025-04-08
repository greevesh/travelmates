import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import { useTripStore } from '../../stores/useTripStore'
import React from 'react'

export default function StartDatePicker() {
	const { startDate, setStartDate, endDate } = useTripStore((state) => ({
		startDate: state.startDate,
		setStartDate: state.setStartDate,
		endDate: state.endDate,
	}))

	const handleStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		event.type === 'dismissed' ? setStartDate(startDate) : setStartDate(selectedDate)
	}

	const threeYearsFromToday = new Date()
	threeYearsFromToday.setFullYear(threeYearsFromToday.getFullYear() + 3)

	return (
		<>
			<DateTimePicker
				value={startDate || new Date()}
				mode="date"
				display="default"
				onChange={handleStartDateChange}
				minimumDate={new Date()}
				maximumDate={endDate || threeYearsFromToday}
			/>
		</>
	)
}