import { StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'

import Title from '../titles/Title'
import Subtitle from '../titles/Subtitle'
import SignInForm from './Form'
import GoogleSignInButton from './buttons/GoogleSignInButton'
import AuthLink from '../AuthLink'

export default function SignInCard() {
	return (
		<Card style={styles.card} mode="contained">
			<Title text='Sign in' style={{ marginTop: 20 }} />
			<Subtitle text='Welcome back!' />
			<SignInForm />
			{/* <GoogleSignInButton /> */}
			{/* <AuthLink path='./forgot-password' text='Forgot your password?' /> */}
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		// height: 530,
		height: 450,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '90%', 
		backgroundColor: '#fff'
	}
})