import { TextInput } from 'react-native-paper'
import { Controller } from 'react-hook-form'

import useToggleSecureText from '../../../../../hooks/useToggleSecureText'
import Eye from './Eye'
import { IInputProps } from '../types'

export default function Password({ control }: IInputProps) {
	const { secureText, setSecureText, icon } = useToggleSecureText(false)

	return (
		<>
			<Controller
				control={control}
				rules={{
					required: true,
					maxLength: 80,
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						onChangeText={onChange}
						value={value}
						secureTextEntry={!secureText}
						placeholder="Password"
						style={{ backgroundColor: '#fff' }}
					/>
				)}
				name="password"
			/>
			<Eye icon={icon} onPress={setSecureText} top={110} />
		</>
	)
}
