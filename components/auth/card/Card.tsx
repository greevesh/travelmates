import { Card } from 'react-native-paper'
import Image from '../image/Image'
import Title from '../../auth/sign-up/titles/Title'
import Subtitle from '../sign-up/titles/subtitle/Subtitle'
import InputRows from '../sign-up/input-rows/InputRows'
import AlreadyHaveAccount from '../../auth/sign-up/already-have-account/AlreadyHaveAccount'
import SignUpButton from '../sign-up/buttons/traditional/SignUpButton'
import GoogleSignUpButton from '../sign-up/buttons/google/GoogleSignUpButton'

export default function AuthCard() {
	return (
		<Card style={{ backgroundColor: '#fff' }} mode="contained">
			<Image />
			<Title />
			<Subtitle />
			<Card.Actions>
				<InputRows />
			</Card.Actions>
			<AlreadyHaveAccount />
			<SignUpButton />
			<GoogleSignUpButton />
		</Card>
	)
}
