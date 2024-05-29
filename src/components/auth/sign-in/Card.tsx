import { Card } from 'react-native-paper'

import Image from '../Image'
import Title from '../titles/Title'
import Subtitle from '../titles/Subtitle'
import SignInForm from './Form'
import GoogleSignInButton from './buttons/GoogleSignInButton'
import ForgotPassword from './ForgotPassword'

export default function SignInCard() {
	return (
		<Card style={{ width: '90%', backgroundColor: '#fff' }} mode="contained">
			<Image />
			<Title text='Sign in' />
			<Subtitle />
			<SignInForm />
			<GoogleSignInButton />
			<ForgotPassword />
		</Card>
	)
}
