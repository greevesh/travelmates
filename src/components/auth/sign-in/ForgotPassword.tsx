import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { SignInScreenNavProp } from '../../../types'

export default function ForgotPassword() {
	const navigation = useNavigation<SignInScreenNavProp>()

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('Forgot Password')}
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
