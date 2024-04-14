import { useState } from 'react'
import { TextInput } from 'react-native-paper'

interface IBaseInputProps {
    placeholder: string
    secureText: boolean
	testId: string
}

export default function BaseInput({placeholder, secureText, testId}: IBaseInputProps) {
	const [text, setText] = useState('')

	return (
		<TextInput placeholder={placeholder} secureTextEntry={secureText} style={{backgroundColor: '#fff'}} value={text} onChangeText={setText} testID={testId} />
	)
}
