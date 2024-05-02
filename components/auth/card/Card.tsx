import { Card } from 'react-native-paper'
import Image from '../../auth/image/Image'
import Title from '../../auth/sign-up/titles/Title'
import Subtitle from '../sign-up/titles/subtitle/Subtitle'
import SignUpForm from '../sign-up/form/Form'
import GoogleSignUpButton from '../sign-up/buttons/google/GoogleSignUpButton'
import { StyleSheet } from 'react-native'

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
		marginTop: 20
	}
})