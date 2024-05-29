import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation, useNavigationState } from '@react-navigation/native'

import { SignInScreenNavProp } from '../../types'

interface IAuthScreenLinkProps {
	text: string
}

export default function AuthScreenLink({ text }: IAuthScreenLinkProps) {
	const navigation = useNavigation<SignInScreenNavProp>()
	const screen = useNavigationState((state) => state.routes[state.index].name)

	const signInPage = screen === 'Sign In'

	return (
		<TouchableOpacity
			onPress={() => (signInPage ? navigation.navigate('Sign Up') : navigation.navigate('Sign In'))}
		>
			<Text style={styles.text}>
				{text}
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
