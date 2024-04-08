import { Card } from 'react-native-paper'
import SignUpTitle from '../sign-up/form/sign-up-title/SignUpTitle'
import SignUpSubtitle from '../sign-up/form/sign-up-subtitle/SignUpSubtitle'
import SignUpInputRows from '../sign-up/form/sign-up-input-rows/SignUpInputRows'
import ForgotPassword from './forgot-password/ForgotPassword'
import SignUpButton from './sign-up-button/SignUpButton'

export default function AuthCard() {
	return (
		<Card style={{ backgroundColor: '#fff' }} mode="contained">
			<SignUpTitle />
			<SignUpSubtitle />
			<Card.Actions>
				<SignUpInputRows />
			</Card.Actions>
			<ForgotPassword />
			<SignUpButton />
		</Card>
	)
}
