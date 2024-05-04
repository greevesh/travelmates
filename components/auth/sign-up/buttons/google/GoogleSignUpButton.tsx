import BaseButton from '../../../../base/Button'

export default function GoogleSignUpButton() {
	return (
		<BaseButton
			text="Sign up with Google"
			icon={{ source: 'google', size: 25 }}
			bgColor="#4285F4"
		/>
	)
}
