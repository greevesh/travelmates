import BaseButton from '../../../../../base/button/BaseButton'

export default function GoogleSignUpButton() {
	return (
		<BaseButton text='Sign up with Google' icon={{source: 'google', size: 25 }} bgColor='#4285F4' testID="google-sign-up" />
	)
}
