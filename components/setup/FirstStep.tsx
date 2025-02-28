import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper'

import ProfilePhoto from '../edit/ProfilePhoto'
import EditPhotoButtons from '../edit/EditPhotoButtons'
import React from 'react'

export default function FirstStep() {
	return (
		<>
			<Card.Actions style={styles.container}>
				<View style={styles.subcontainer}>
					<ProfilePhoto size={85} />
					<EditPhotoButtons />
				</View>
			</Card.Actions>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		height: 137,
		marginTop: 25
	},
	subcontainer: {
		display: 'flex',
		flexDirection: 'row'
	}
})