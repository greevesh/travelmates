import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function ForgotPassword() {
	return (
		<TouchableOpacity
			onPress={() => console.log('forgot password')}
		>
			<Text style={styles.text}>
				Forgot your password?
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		color: '#006994',
	},
})
