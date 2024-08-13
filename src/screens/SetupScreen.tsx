import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

export default function SetupScreen() {
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.text}>Setup</Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%'
	},
	text: {
		fontSize: 25
	}
})