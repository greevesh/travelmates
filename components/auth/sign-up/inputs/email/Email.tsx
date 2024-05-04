import { TextInput } from 'react-native-paper'
import { Controller } from 'react-hook-form'
import { IInputProps } from '../types'

export default function Email({control}: IInputProps) {
	return <Controller
		control={control}
		rules={{
			required: true,
		}}
		render={({ field: { onChange, value } }) => (
			<TextInput
				onChangeText={onChange}
				value={value}
				placeholder="Email"
				style={{ backgroundColor: '#fff' }}
			/>
		)}
		name="email"
	/>
}
