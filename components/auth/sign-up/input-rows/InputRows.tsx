import { StyleSheet, View } from 'react-native'
import Email from '../inputs/email/Email'
import Password from '../inputs/password/Password'
import PasswordConfirmation from '../inputs/password/password-confirmation/PasswordConfirmation'

export default function Rows() {
	return (
		<View style={styles.container} testID="sign-up-rows">
			<Email />
			<Password />
			<PasswordConfirmation />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		rowGap: 30,
		width: 375,
	},
})
