import { StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'

import SearchUserBar from '../edit/SearchUserBar'

export default function FourthStep() {
	return (
		<>
			<Card.Actions style={styles.container}>
				<SearchUserBar />
			</Card.Actions>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		height: 97
	},
})