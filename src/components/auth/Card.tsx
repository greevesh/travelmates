import { Card } from 'react-native-paper'

import Image from './Image'
import Title from './titles/Title'
import Subtitle from './titles/Subtitle'
import SignUpForm from './sign-up/form/Form'
import GoogleSignUpButton from './sign-up/buttons/GoogleSignUpButton'

export default function SignUpCard() {
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
