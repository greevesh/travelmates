import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card, Icon, TextInput } from 'react-native-paper'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import SearchLocationBar from '../edit/SearchLocationBar'

export default function SecondStep() {
	const [location, setLocation] = useState<string | undefined>(undefined)
	const [startDate, setStartDate] = useState<Date | undefined>(undefined)
	const [endDate, setEndDate] = useState<Date | undefined>(undefined)
	const [showStartDatePicker, setShowStartDatePicker] = useState(false)
	const [showEndDatePicker, setShowEndDatePicker] = useState(false)

	const onStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (event.type === 'dismissed') {
			setStartDate(startDate)
		}
		else {
			setStartDate(selectedDate)
		}
		setShowStartDatePicker(!showStartDatePicker)
	}
	
	const onEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
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
			<Card.Actions style={styles.container}>
				<SearchLocationBar setLocation={setLocation} />
				<View style={styles.datePickerContainer}>
					<TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
						<TextInput
							label="Start Date"
							value={startDate ? startDate.toDateString() : ''}
							editable={false}
							style={styles.dateInput}
						/>
					</TouchableOpacity>
					{showStartDatePicker && (
						<DateTimePicker
							value={startDate || new Date()}
							mode="date"
							display="default"
							onChange={onStartDateChange}
							onTouchCancel={() => setShowStartDatePicker(!showStartDatePicker)}
						/>
					)}
					<TouchableOpacity onPress={() => setShowEndDatePicker(!showEndDatePicker)}>
						<TextInput
							label="End Date"
							value={endDate ? endDate.toDateString() : ''}
							editable={false}
							style={styles.dateInput}
						/>
					</TouchableOpacity>
					{showEndDatePicker && (
						<DateTimePicker
							value={endDate || new Date()}
							mode="date"
							display="default"
							onChange={onEndDateChange}
							onTouchCancel={() => setShowStartDatePicker(!showStartDatePicker)}
						/>
					)}
				</View>
				<View style={styles.output}>
					<View style={styles.outputItem}>
						<Icon size={15} source='pin' color='red'/><Text style={{ color: '#838285', marginLeft: 4 }}>{location ? location : 'Please choose a location'}</Text>
					</View>
					<View style={styles.outputItem}>
						<Icon size={15} source='calendar' color='#595859'/><Text style={{ color: '#838285', marginLeft: 4 }}>{startDate && endDate ? `${startDate.toDateString()} - ${endDate.toDateString()}` : 'Please choose a date range'}</Text>
					</View>
				</View>
			</Card.Actions>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative'
	},
	datePickerContainer: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 20,
	},
	dateInput: {
		height: 50,
		width: 135,
		fontSize: 12.5,
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
		marginVertical: 10,
		marginRight: 7,
	},
	output: {
		width: '100%',
		marginTop: 10,
		marginBottom: 20,
		marginLeft: 25
	},
	outputItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 20,
	},
})