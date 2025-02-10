import { StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'

import Title from '../titles/Title'
import Subtitle from '../titles/Subtitle'
import SignUpForm from './form/Form'
import GoogleSignUpButton from './buttons/GoogleSignUpButton'

export default function SignUpCard() {
	return (
		<Card style={styles.card} mode="contained">
			<Title text='Sign up' style={{ marginTop: 20 }} />
			<Subtitle text='Become a Travel Mate today' />
			<SignUpForm />
			<GoogleSignUpButton />
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		height: 600,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '90%', 
		backgroundColor: '#fff'
	}
})