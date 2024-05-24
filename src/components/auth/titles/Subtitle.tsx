import { StyleSheet } from 'react-native'
import { useNavigationState } from '@react-navigation/native'

import BaseTitle from '../../base/Title'

export default function Subtitle() {
	const screen = useNavigationState((state) => state.routes[state.index].name)

	return (
		<BaseTitle style={styles.title}>
			{screen === 'Sign Up' ? 'Become a Travel Mate today' : 'Welcome back'}
		</BaseTitle>
	)
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		marginTop: 10,
		fontSize: 16,
		color: '#808080',
	},
})
