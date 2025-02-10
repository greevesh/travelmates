import { StyleSheet } from 'react-native'

import BaseTitle from '../../base/Title'

interface ISubtitleProps {
	text: string
}

export default function Subtitle({ text }: ISubtitleProps) {
	return (
		<BaseTitle style={styles.title}>
			{text}
		</BaseTitle>
	)
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		marginTop: 10,
		fontSize: 16,
		color: '#808080',
	},
})
