import { StyleSheet, View } from 'react-native'

import ForgotPasswordCard from '../components/auth/forgot-password/Card'

export default function ForgotPasswordScreen() {
	return (
		<>
			<View style={styles.container}>
				<ForgotPasswordCard />
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
})