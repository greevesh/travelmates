import { Card } from 'react-native-paper'

import Title from '../titles/Title'
import Subtitle from '../titles/Subtitle'
import SignInForm from './Form'
import GoogleSignInButton from './buttons/GoogleSignInButton'
import ForgotPassword from './ForgotPassword'

export default function SignInCard() {
	return (
		<Card style={{ width: '90%', backgroundColor: '#fff' }} mode="contained">
			<Title text='Sign in' />
			<Subtitle text='Welcome back!' />
			<SignInForm />
			<GoogleSignInButton />
			<ForgotPassword />
		</Card>
	)
}
