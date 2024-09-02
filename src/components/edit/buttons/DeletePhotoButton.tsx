import { StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'

export default function DeletePhotoButton() {
	const handleClick = () => {
		console.log('modal opened')
	}

	return (
		<Button onPress={handleClick} style={styles.btn} icon="delete" labelStyle={{ color: '#ff3c33' }}><Text style={{ color: '#424242' }}>Delete</Text></Button>
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