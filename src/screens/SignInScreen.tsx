import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import BaseButton from '../components/base/Button'
import { SignUpScreenNavProp } from '../types'

export default function SignInScreen() {
	const navigation = useNavigation<SignUpScreenNavProp>()

	return (
		<View>
			<BaseButton
				text='Sign up'
				onPress={() => navigation.navigate('Sign Up')}
				bgColor='green'
			/>
		</View>
	)
}
