import BaseButton from '../../../base/Button'

export default function GoogleSignUpButton() {
	return (
		<BaseButton
			onPress={() => console.log('pressed')}
			text="Sign up with Google"
			icon={{ source: 'google', size: 25 }}
			bgColor="#4285F4"
		/>
	)
}
