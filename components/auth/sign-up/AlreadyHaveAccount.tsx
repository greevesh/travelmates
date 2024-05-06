import { StyleSheet, Text } from 'react-native'

export default function AlreadyHaveAccount() {
	return (
		<Text style={styles.text}>Already have an account?</Text>
	)
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		color: '#006994',
	}
})