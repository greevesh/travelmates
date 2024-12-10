import { useState } from 'react'
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
		event.type === 'dismissed' ? setEndDate(endDate) : setEndDate(selectedDate)
		setShowEndDatePicker(!showEndDatePicker)
	}

	return (
		<>
			<DateTimePicker
				value={endDate || new Date()}
				mode="date"
				display="default"
				onChange={handleEndDateChange}
				onTouchCancel={() => setShowEndDatePicker(!showEndDatePicker)}
				minimumDate={startDate ?? new Date()}
			/>
		</>
	)
}