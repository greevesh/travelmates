import { TextInput } from 'react-native-paper'
import { Controller } from 'react-hook-form'

import { IInputProps } from './types'

export default function Username({ control }: IInputProps) {
	return (
		<Controller
			control={control}
			rules={{
				required: true,
			}}
			render={({ field: { onChange, value } }) => (
				<TextInput
					selectionColor='#3a9fff'
					activeUnderlineColor='#3a9fff'
					autoCorrect={false}
					spellCheck={false}
					autoCapitalize='none'
					onChangeText={onChange}
					value={value}
					placeholder="Username"
					style={{ backgroundColor: '#fff' }}
				/>
			)}
			name="username"
		/>
	)
}
