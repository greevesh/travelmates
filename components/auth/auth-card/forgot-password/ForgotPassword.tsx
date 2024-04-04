import { StyleSheet, Text } from 'react-native'

export default function ForgotPassword() {
	return (
		<Text style={styles.text}>Forgot your password?</Text>
	)
}

const styles = StyleSheet.create({
	text: {
		marginVertical: 24,
		color: 'blue',
	}
})