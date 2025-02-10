import { StyleSheet, TextStyle } from 'react-native'

import BaseTitle from '../../base/Title'

interface ITitleProps {
	text: string,
	style?: TextStyle
}

export default function Title({ text, style }: ITitleProps) {
	return <BaseTitle style={[styles.title, style]}>{text}</BaseTitle>
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 28,
	},
})
