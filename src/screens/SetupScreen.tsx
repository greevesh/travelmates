import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import SignOutButton from '../components/auth/SignOutButton'

export default function SetupScreen() {
	return (
		<>
			<View style={styles.nav}>
				<SignOutButton />
			</View>
			<View style={styles.container}>
				<Text style={styles.text}>Setup</Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	nav: {
		width: '30%',
		position: 'absolute',
		top: 5,
		right: 5
	},
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