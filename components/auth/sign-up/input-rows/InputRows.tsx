import { View } from 'react-native'
import Email from '../inputs/email/Email'
import Password from '../inputs/password/Password'
import PasswordConfirmation from '../inputs/password/password-confirmation/PasswordConfirmation'

export default function Rows() {
	return (
		<View testID="sign-up-rows">
			<Email />
			<Password />
			<PasswordConfirmation />
		</View>
	)
}
