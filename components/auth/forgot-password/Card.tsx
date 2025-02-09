import { Card } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

import Title from '../titles/Title'
import Email from '../inputs/Email'
import ResetPasswordButton from './ResetPasswordButton'

export default function ForgotPasswordCard() {
	return (
		<Card style={{ width: '90%', backgroundColor: '#fff' }} mode="contained">
			<Title text="Forgot password" />
			<View style={styles.container}>
				<Email />
				<ResetPasswordButton onPress={() => console.log('reset password')} />
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