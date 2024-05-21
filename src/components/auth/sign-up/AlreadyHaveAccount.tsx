import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { SignInScreenNavProp } from '../../../types'

export default function AlreadyHaveAccount() {
	const navigation = useNavigation<SignInScreenNavProp>()

	return (
		<TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
			<Text style={styles.text}>Already have an account?</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		color: '#006994',
	},
})
