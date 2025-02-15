import { Card, Icon } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

import Title from '../titles/Title'
import Email from '../inputs/Email'
import ResetPasswordButton from './ResetPasswordButton'
import AuthLink from '../AuthLink'

export default function ForgotPasswordCard() {
	return (
		<Card style={styles.card} mode="contained">
			<Title text="Forgot password" style={{ marginTop: 20 }} />
			<View style={styles.container}>
				<Email />
				<ResetPasswordButton onPress={() => console.log('reset password')} />
				<View style={styles.signInLinkContainer}>
					<View style={styles.signInLink}>
						<Icon color='#808080' size={20} source="arrow-left" />
						<AuthLink path='./' text='Back to sign in' />
					</View>
				</View>
			</View>
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		height: 340,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '90%', 
		backgroundColor: '#fff'
	},
	container: {
		marginTop: 70,
		width: 300,
		rowGap: 25
	},
	signInLinkContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	signInLink: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 5
	}
})