import { ScrollView, StyleSheet, View } from 'react-native'

import SignUpCard from '../components/auth/Card'

export default function SignUpScreen() {
	return (
		<>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.content}>
					<SignUpCard />
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