import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card, Icon, Searchbar, TextInput } from 'react-native-paper'
// @ts-expect-error removes red squiggly for correct import of @env
import { GOOGLE_PLACES_API_KEY } from '@env'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

export default function SecondStep() {
	const [query, setQuery] = useState('')
	const [places, setPlaces] = useState<Array<{ place_id: string; description: string }>>([])
	const [error, setError] = useState<string | null>(null)
	const [location, setLocation] = useState<string | undefined>(undefined)
	const [startDate, setStartDate] = useState<Date | undefined>(undefined)
	const [endDate, setEndDate] = useState<Date | undefined>(undefined)
	const [showStartDatePicker, setShowStartDatePicker] = useState(false)
	const [showEndDatePicker, setShowEndDatePicker] = useState(false)

	const fetchPlaces = async (input: string) => {
		const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_PLACES_API_KEY}&language=en&types=(cities)`
		try {
			const response = await fetch(url)
			const data = await response.json()
			setPlaces(data.predictions)
			setError(null)
		} catch (error) {
			setError('Failed to fetch places. Please try again.')
		}
	}

	const onLocationChange = (place: string) => {
		setLocation(place)
		setPlaces([])
	}

	const onStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		setShowStartDatePicker(false)
		if (selectedDate) {
			setStartDate(selectedDate)
		}
	}
	
	const onEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		setShowEndDatePicker(false)
		if (selectedDate) {
			setEndDate(selectedDate)
		}
	}

	return (
		<>
			<Card.Actions style={styles.container}>
				<Searchbar
					inputStyle={{ marginTop: -5 }}
					mode='bar'
					style={styles.searchbar}
					value={query}
					onChangeText={(text) => {
						setQuery(text)
						fetchPlaces(text)
					}}
					placeholder="Search location"
				/>
				{error && <Text style={styles.errorText}>{error}</Text>}
				<View style={styles.resultsContainer}>
					{places.map((place) => (
						<TouchableOpacity onPress={() => onLocationChange(place.description)} key={place.place_id} style={styles.resultItem}>
							<Text>{place.description}</Text>
						</TouchableOpacity>
					))}
				</View>
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
						/>
					)}
					<TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
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
	searchbar: {
		height: 45,
		width: 300,
		borderRadius: 50,
		marginRight: 7,
		backgroundColor: '#f0f0f0'
	},
	resultsContainer: {
		position: 'absolute',
		top: 50,
		width: 280,
		marginTop: 10,
		backgroundColor: '#fff',
		borderColor: '#ccc',
		zIndex: 1000
	},
	resultItem: {
		padding: 10,
		borderColor: '#ccc',
		borderBottomWidth: 1
	},
	errorText: {
		marginTop: 10,
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