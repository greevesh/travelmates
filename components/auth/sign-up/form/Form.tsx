import { View } from 'react-native'
import InputRows from '../input-rows/InputRows'
import AlreadyHaveAccount from '../already-have-account/AlreadyHaveAccount'
import SignUpButton from '../buttons/traditional/SignUpButton'
import GoogleSignUpButton from '../buttons/google/GoogleSignUpButton'

export default function SignUpForm() {
	return (
		<View testID='sign-up-form'>
			<InputRows />
			<AlreadyHaveAccount />
			<SignUpButton />
			<GoogleSignUpButton />
		</View>
	)
}