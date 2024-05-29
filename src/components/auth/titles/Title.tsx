import { StyleSheet } from 'react-native'

import BaseTitle from '../../base/Title'

interface ITitleProps {
	text: string
}

export default function Title({ text }: ITitleProps) {
	return <BaseTitle style={styles.title}>{text}</BaseTitle>
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 28,
	},
})
