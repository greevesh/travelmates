import { GestureResponderEvent } from 'react-native'

import BaseButton from '../../base/Button'

interface IResetPasswordButtonProps {
  onPress: (event: GestureResponderEvent) => void
}

export default function ResetPasswordButton({ onPress }: IResetPasswordButtonProps) {
	return <BaseButton onPress={onPress} text="Reset password" bgColor="#0047AB" />
}
