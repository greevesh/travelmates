import { GestureResponderEvent } from 'react-native'

import BaseButton from '../../../base/Button'

interface ISignInButtonProps {
  onPress: (event: GestureResponderEvent) => void
}

export default function SignInButton({ onPress }: ISignInButtonProps) {
	return <BaseButton onPress={onPress} text="Sign in" bgColor="#0047AB" />
}
