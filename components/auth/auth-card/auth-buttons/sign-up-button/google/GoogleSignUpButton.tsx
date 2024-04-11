import { Pressable, StyleSheet } from 'react-native'
import { Icon, Text } from 'react-native-paper'

export default function GoogleSignUpButton() {
	return (
		<Pressable style={styles.button} testID="google-sign-up">
			<Icon size={25} source="google" color="#fff" />
			<Text style={styles.text}>Sign up with Google</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#4285F4',
		borderRadius: 4,
		height: 48,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		columnGap: 10,
		width: '100%',
		marginTop: 20,
	},
	text: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
})
