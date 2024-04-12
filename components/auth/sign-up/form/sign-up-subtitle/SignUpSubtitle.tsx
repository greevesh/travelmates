import { StyleSheet } from 'react-native'
import BaseTitle from '../../../../base/title/BaseTitle'

export default function SignUpSubtitle() {
	return (
		<BaseTitle style={styles.title} testId='sign-up-subtitle'>Become a Travel Mate today</BaseTitle>
	)
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		marginTop: 10,
		fontSize: 16,
		color: '#808080'
	},
})