import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'

import { useTripStore } from '../../../stores/useTripStore'
import React from 'react'

export default function Output() {
	const { startDate, endDate } = useTripStore((state) => ({
		startDate: state.startDate,
		endDate: state.endDate
	}))

	return (
		<>
			<View style={styles.container}>
				<View style={styles.item}>
					<Icon size={15} source='calendar' color='#595859' /><Text style={styles.text}>{startDate && endDate ? `${startDate.toDateString()} - ${endDate.toDateString()}` : 'Please choose a date range'}</Text>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		top: 30,
		marginBottom: 20,
		marginLeft: 30
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 20,
	},
	text: {
		color: '#838285',
		marginLeft: 4
	}
})