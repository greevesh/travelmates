import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

interface IBaseInputProps {
    placeholder: string
    secureText: boolean
	testId: string
}

export default function BaseInput({placeholder, secureText, testId}: IBaseInputProps) {
	const [text, setText] = useState('')

	const styles = StyleSheet.create({
		input: {
			backgroundColor: '#fff'
		}
	})

	return (
		<TextInput placeholder={placeholder} secureTextEntry={secureText} style={styles.input} value={text} onChangeText={setText} testID={testId} />
	)
}
