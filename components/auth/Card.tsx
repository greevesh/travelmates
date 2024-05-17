import { Card } from 'react-native-paper'

import Image from './Image'
import Title from './sign-up/titles/Title'
import Subtitle from './sign-up/titles/Subtitle'
import SignUpForm from './sign-up/form/Form'
import GoogleSignUpButton from './sign-up/buttons/GoogleSignUpButton'

export default function AuthCard() {
	return (
		<Card style={{ width: '90%', backgroundColor: '#fff' }} mode="contained">
			<Image />
			<Title />
			<Subtitle />
			<SignUpForm />
			<GoogleSignUpButton />
		</Card>
	)
}
