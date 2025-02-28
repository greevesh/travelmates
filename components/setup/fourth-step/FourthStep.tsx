import { StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'

import SearchUserBar from '../../edit/SearchUserBar'
import FinishButton from './FinishButton'
import React from 'react'

export default function FourthStep() {
	return (
		<>
			<Card.Actions style={styles.container}>
				<SearchUserBar />
				<FinishButton />
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