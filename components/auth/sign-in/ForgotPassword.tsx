import { StyleSheet } from 'react-native'

import { Link } from 'expo-router'

export default function ForgotPassword() {
	return (
		<Link href='/forgot-password' style={styles.text}>Forgot your password?</Link>
	)
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		color: '#006994',
	},
})
