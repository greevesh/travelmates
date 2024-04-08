import React from 'react'
import BaseInput from '../../../../../../base/input/BaseInput'
import Eye from '../eye/Eye'
import { View } from 'react-native'

export default function PasswordInput() {
	return (
		<>
			<BaseInput placeholder="Password" secureText={true} testId="password-input" />
			<View>
				<Eye />
			</View>
		</>
	)
}
