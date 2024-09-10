import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'
import { Searchbar } from 'react-native-paper'

export default function SecondStep() {
	const [query, setQuery] = useState('')

	return (
		<>
			<Card.Actions style={styles.container}>
				<Searchbar inputStyle={{ marginTop: -5 }} mode='bar' style={styles.searchbar} value={query} onChangeText={setQuery} placeholder="Search location" />
			</Card.Actions>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
	},
	searchbar: {
		height: 45,
		width: 300,
		marginRight: 2,
		borderRadius: 50,
	}
})