import * as SecureStore from 'expo-secure-store'

import BaseButton from '../base/Button'
import { useAuthStore } from '../../stores/useAuthStore'
import { removeAuthTokens, signOut } from '../../utils/auth'

export default function SignOutButton() {
	const setIsSignedIn = useAuthStore((state) => state.setIsSignedIn)

	const onSubmit = async () => {
		await signOut()
		const refreshToken = await SecureStore.getItemAsync('refreshToken')
		const accessToken = await SecureStore.getItemAsync('accessToken')

		if (refreshToken && accessToken) {
			await removeAuthTokens()
		}

		setIsSignedIn(false)
	}

	return <BaseButton onPress={onSubmit} text="Sign out" bgColor="#0047AB" />
}
