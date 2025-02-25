import { StyleSheet, View } from 'react-native'

import SignInCard from '@/components/auth/sign-in/Card'

import { LinearGradient } from 'expo-linear-gradient'

export default function Page() {
	return (
		<LinearGradient colors={['#3b5998', '#8b9dc3']}>
			<View style={styles.container}>
				<View style={styles.content}>
					<SignInCard />
				</View>
			</View>
		</LinearGradient>
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