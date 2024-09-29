import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'

import SearchLocationBar from '../../edit/SearchLocationBar'
import EndDatePicker from '../../edit/EndDatePicker'
import StartDatePicker from '../../edit/StartDatePicker'
import Output from './Output'

export default function SecondStep() {
	const [location, setLocation] = useState<string | undefined>(undefined)
	const [endDate, setEndDate] = useState<Date | undefined>(undefined)

	return (
		<>
			<Card.Actions style={styles.container}>
				<SearchLocationBar setLocation={setLocation} />
				<View style={styles.datePickerContainer}>
					<StartDatePicker maxDate={endDate} />
					<EndDatePicker endDate={endDate} setEndDate={setEndDate} />
				</View>
				<Output location={location} endDate={endDate} />
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