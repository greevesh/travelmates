import { GestureResponderEvent } from 'react-native'
import BaseButton from '../../../../base/Button'

interface ISignUpButtonProps {
	onPress: (event: GestureResponderEvent) => void
}

export default function SignUpButton({onPress}: ISignUpButtonProps) {
	return <BaseButton onPress={onPress} text="Sign up" bgColor="#0047AB" testId="sign-up-button" />
}
