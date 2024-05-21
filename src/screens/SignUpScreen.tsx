import { ScrollView, StyleSheet, View } from 'react-native'

import AuthCard from '../components/auth/Card'

export default function SignUpScreen() {
	return (
		<>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.content}>
					<AuthCard />
				</View>
			</ScrollView>	
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
	},
	content: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
})