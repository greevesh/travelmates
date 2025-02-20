import { GestureResponderEvent } from 'react-native'

import BaseButton from '../../../base/Button'
import { ReactNode } from 'react'

interface ISignInButtonProps {
  onPress: (event: GestureResponderEvent) => void
  children: ReactNode
}

export default function SignInButton({ onPress, children }: ISignInButtonProps) {
	return <BaseButton onPress={onPress} text="Sign in" bgColor="#0047AB">{children}</BaseButton>
}
