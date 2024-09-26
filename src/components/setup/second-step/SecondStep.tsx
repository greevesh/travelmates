import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'

import SearchLocationBar from '../../edit/SearchLocationBar'
import EndDatePicker from '../../edit/EndDatePicker'
import StartDatePicker from '../../edit/StartDatePicker'
import Output from './Output'

export default function SecondStep() {
	const [location, setLocation] = useState<string | undefined>(undefined)
	const [startDate, setStartDate] = useState<Date | undefined>(undefined)
	const [endDate, setEndDate] = useState<Date | undefined>(undefined)

	return (
		<>
			<Card.Actions style={styles.container}>
				<SearchLocationBar setLocation={setLocation} />
				<View style={styles.datePickerContainer}>
					<StartDatePicker startDate={startDate} setStartDate={setStartDate} />
					<EndDatePicker endDate={endDate} setEndDate={setEndDate} startDate={startDate} />
				</View>
				<Output location={location} startDate={startDate} endDate={endDate} />
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
	}
})