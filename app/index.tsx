import { ScrollView, StyleSheet, View } from 'react-native'

import SetupCard from '../components/setup/Card'

import SignInCard from '../components/auth/sign-in/Card'

import { LinearGradient } from 'expo-linear-gradient'

export default function Index() {
	return (
		<>
			<LinearGradient
				colors={[ '#72C6EF', '#004E8F' ]}
				style={styles.gradientBackground}
			>
				<ScrollView contentContainerStyle={styles.container}>
					<View style={styles.content}>
						{/* <SignInCard /> */}
						<SetupCard />
					</View>
				</ScrollView>
			</LinearGradient>
		</>
	)
}

const styles = StyleSheet.create({
	gradientBackground: {
		flex: 1
	},
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