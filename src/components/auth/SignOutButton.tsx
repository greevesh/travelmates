import { useNavigation } from '@react-navigation/native'

import BaseButton from '../base/Button'
import { useAuthStore } from '../../stores/useAuthStore'
import { SignInScreenNavProp } from '../../types'

export default function SignOutButton() {
	const navigation = useNavigation<SignInScreenNavProp>()
	const setIsSignedIn = useAuthStore((state) => state.setIsSignedIn)

	const onSubmit = () => {
		setIsSignedIn(false)
		navigation.navigate('Sign In')
	}

	return <BaseButton onPress={onSubmit} text="Sign out" bgColor="#0047AB" />
}
