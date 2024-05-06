import { StyleSheet, View } from 'react-native'
import AuthCard from './components/auth/Card'

export default function App() {
	return (
		<View style={styles.container}>
			<AuthCard />
		</View>
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
