import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'

import { useTripStore } from '../../../stores/useTripStore'

interface IOutputProps {
    location: string | undefined
    endDate: Date | undefined
}

export default function Output({ location, endDate }: IOutputProps) {
	const startDate = useTripStore((state) => state.startDate)

	return (
		<View style={styles.container}>
			<View style={styles.item}>
				<Icon size={15} source='pin' color='red'/><Text style={styles.text}>{location ? location : 'Please choose a location'}</Text>
			</View>
			<View style={styles.item}>
				<Icon size={15} source='calendar' color='#595859'/><Text style={styles.text}>{startDate && endDate ? `${startDate.toDateString()} - ${endDate.toDateString()}` : 'Please choose a date range'}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginTop: 10,
		marginBottom: 20,
		marginLeft: 25
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