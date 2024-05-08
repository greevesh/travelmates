import { Card } from 'react-native-paper'
import { StyleSheet } from 'react-native'

import Image from './Image'
import Title from './sign-up/titles/Title'
import Subtitle from './sign-up/titles/Subtitle'
import SignUpForm from './sign-up/form/Form'
import GoogleSignUpButton from './sign-up/buttons/GoogleSignUpButton'

export default function AuthCard() {
	return (
		<Card style={styles.card} mode="contained">
			<Image />
			<Title />
			<Subtitle />
			<SignUpForm />
			<GoogleSignUpButton />
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		width: '90%',
		marginTop: 20,
	},
})
