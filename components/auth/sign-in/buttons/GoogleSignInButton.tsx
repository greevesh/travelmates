import BaseButton from '../../../base/Button'

export default function GoogleSignInButton() {
	return (
		<BaseButton
			onPress={() => console.log('pressed')}
			text="Sign in with Google"
			icon={{ source: 'google', size: 25 }}
			bgColor="#4285F4"
			mb={20}
		/>
	)
}
