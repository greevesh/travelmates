import { StyleSheet, Text } from 'react-native'

export default function AlreadyHaveAccount() {
	return (
		<Text style={styles.text} testID='already-have-account'>Already have an account?</Text>
	)
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		marginTop: 50,
		color: '#006994',
	}
})