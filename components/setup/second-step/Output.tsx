import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-paper'

import { useTripStore } from '../../../stores/useTripStore'

export default function Output() {
	const { location } = useTripStore((state) => ({
		location: state.location
	}))

	return (
		<>
			<View style={styles.container}>
				<View style={styles.item}>
					<Icon size={15} source='pin' color='red' /><Text style={styles.text}>{location ? location : 'Please choose a location'}</Text>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		top: 50,
		marginBottom: 20,
		marginLeft: 25,
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