import { Card } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

import Image from '../../Logo'
import Title from '../titles/Title'
import AuthScreenLink from '../AuthScreenLink'
import Email from '../inputs/Email'
import ResetPasswordButton from './ResetPasswordButton'

export default function ForgotPasswordCard() {
	return (
		<Card style={{ width: '90%', backgroundColor: '#fff' }} mode="contained">
			<Image />
			<Title text="Forgot password" />
			<View style={styles.container}>
				<Email />
				<ResetPasswordButton onPress={() => console.log('reset password')} />
				<AuthScreenLink text="Return to Sign in" />
			</View>
		</Card>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 100,
		rowGap: 25
	},
})