import EndDatePicker from '@/components/edit/EndDatePicker'
import StartDatePicker from '@/components/edit/StartDatePicker'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'
import Output from './Output'

export default function ThirdStep() {
	return (
		<>
			<Card.Actions style={styles.container}>
				<View style={styles.subcontainer}>
					<StartDatePicker />
					<EndDatePicker />
				</View>
				<Output />
			</Card.Actions>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		marginTop: 20,
		flexDirection: 'column',
		position: 'relative',
		height: 118,
	},
	subcontainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		columnGap: 20,
		width: '100%',
		marginRight: 8
	},
})