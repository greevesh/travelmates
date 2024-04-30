import { Card } from 'react-native-paper'
import Image from '../image/Image'
import Title from '../../auth/sign-up/titles/Title'
import Subtitle from '../sign-up/titles/subtitle/Subtitle'
import SignUpForm from '../sign-up/form/Form'
import GoogleSignUpButton from '../sign-up/buttons/google/GoogleSignUpButton'

export default function AuthCard() {
	return (
		<Card style={{ backgroundColor: '#fff', width: '90%' }} mode="contained">
			<Image />
			<Title />
			<Subtitle />
			<SignUpForm />
			<GoogleSignUpButton />
		</Card>
	)
}
