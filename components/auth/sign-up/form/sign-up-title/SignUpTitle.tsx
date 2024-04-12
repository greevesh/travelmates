import { StyleSheet } from 'react-native'
import BaseTitle from '../../../../base/title/BaseTitle'

export default function SignUpTitle() {
	return (
		<BaseTitle style={styles.title} testId='sign-up-title'>Sign up</BaseTitle>
	)
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 28,
	},
})