import { GestureResponderEvent } from 'react-native'
import { ReactNode } from 'react'

import BaseButton from '../../../base/Button'

interface ISignUpButtonProps {
  onPress: (event: GestureResponderEvent) => void
  children: ReactNode
}

export default function SignUpButton({ onPress, children }: ISignUpButtonProps) {
	return <BaseButton onPress={onPress} text="Sign up" bgColor="#0047AB">{children}</BaseButton>
}
