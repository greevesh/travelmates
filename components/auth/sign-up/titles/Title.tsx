import { StyleSheet } from 'react-native'
import BaseTitle from '../../../base/Title'

export default function Title() {
	return (
		<BaseTitle style={styles.title}>
      Sign up
		</BaseTitle>
	)
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 28,
	},
})
