import { ScrollView, StyleSheet, View } from 'react-native'

import SignInCard from '@/components/auth/sign-in/Card'

export default function Page() {
	return (
		<>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.content}>
					<SignInCard />
				</View>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	content: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
})