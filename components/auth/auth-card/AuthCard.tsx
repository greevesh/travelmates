import { Card } from 'react-native-paper'
import AuthImage from '../auth-image/AuthImage'
import SignUpTitle from '../sign-up/form/sign-up-title/SignUpTitle'
import SignUpSubtitle from '../sign-up/form/sign-up-subtitle/SignUpSubtitle'
import SignUpInputRows from '../sign-up/form/sign-up-input-rows/SignUpInputRows'
import AlreadyHaveAccount from '../sign-up/form/already-have-account/AlreadyHaveAccount'
import SignUpButton from './auth-buttons/sign-up-button/SignUpButton'
import GoogleSignUpButton from './auth-buttons/sign-up-button/google/GoogleSignUpButton'

export default function AuthCard() {
	return (
		<Card style={{ backgroundColor: '#fff' }} mode="contained">
			<AuthImage />
			<SignUpTitle />
			<SignUpSubtitle />
			<Card.Actions>
				<SignUpInputRows />
			</Card.Actions>
			<AlreadyHaveAccount />
			<SignUpButton />
			<GoogleSignUpButton />
		</Card>
	)
}
