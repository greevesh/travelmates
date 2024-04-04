import { StyleSheet, View } from 'react-native'
import EmailInput from '../input/email-input/EmailInput'
import PasswordInput from '../input/password-input/PasswordInput'
import PasswordConfirmationInput from '../input/password-confirmation-input/PasswordConfirmationInput'

export default function SignUpInputRows() {
	return (
		<View style={styles.container} testID='sign-up-rows'>
			<EmailInput />
			<PasswordInput />
			<PasswordConfirmationInput />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		rowGap: 30,
		width: 375,
	}
})