import { StyleSheet, Text } from 'react-native'

export default function AlreadyHaveAccount() {
	return (
		<Text style={styles.text} testID='already-have-account'>Already have an account?</Text>
	)
}

const styles = StyleSheet.create({
	text: {
		display: 'flex',
		justifyContent: 'center',
		marginVertical: 24,
		color: '#006994',
	}
})