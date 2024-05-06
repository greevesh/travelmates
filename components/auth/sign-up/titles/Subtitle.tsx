import { StyleSheet } from 'react-native'
import BaseTitle from '../../../base/Title'

export default function Subtitle() {
	return <BaseTitle style={styles.title}>Become a Travel Mate today</BaseTitle>
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		marginTop: 10,
		fontSize: 16,
		color: '#808080',
	},
})
