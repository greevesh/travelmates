import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'

import SearchLocationBar from '../../edit/SearchLocationBar'
import Output from './Output'

export default function SecondStep() {
	return (
		<>
			<Card.Actions style={styles.container}>
				<SearchLocationBar />
				<Output />
			</Card.Actions>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: 137,
		flexDirection: 'column',
		position: 'relative'
	},
})