import { TextInput } from 'react-native-paper'
import { Controller } from 'react-hook-form'

import useToggleSecureText from '../../../../hooks/useToggleSecureText'
import Eye from './Eye'
import { IInputProps } from '../types'
import React from 'react'

export default function PasswordConfirmation({ control }: IInputProps) {
	const { secureText, setSecureText, icon } = useToggleSecureText(false)

	return (
		<>
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						selectionColor='#3a9fff'
						activeUnderlineColor='#3a9fff'
						onChangeText={onChange}
						value={value}
						secureTextEntry={!secureText}
						placeholder="Confirm password"
						style={{ backgroundColor: '#fff' }}
					/>
				)}
				name="passwordConfirmation"
			/>
			<Eye icon={icon} onPress={setSecureText} top={200} />
		</>
	)
}
