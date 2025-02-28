import { Alert, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'

import { useProfilePhotoStore } from '../../../stores/useProfilePhotoStore'
import React from 'react'

export default function DeletePhotoButton() {
	const setUploaded = useProfilePhotoStore((state) => state.setUploaded)

	const handleDelete = () => {
		setUploaded(false)
	}

	const handleClick = () => {
		Alert.alert('Delete the photo?', '', [
			{
				text: 'Cancel',
			},
			{ text: 'DELETE', onPress: () => handleDelete() },
		])
	}

	return (
		<>
			<Button onPress={handleClick} style={styles.btn} icon="delete" labelStyle={{ color: '#ff3c33' }}><Text style={{ color: '#424242' }}>Delete</Text></Button>
		</>
	)
}

const styles = StyleSheet.create({
	btn: {
		borderRadius: 7,
		width: '65%',
		borderWidth: 1,
		borderColor: '#6c6c6c',
		backgroundColor: '#fff'
	},
})