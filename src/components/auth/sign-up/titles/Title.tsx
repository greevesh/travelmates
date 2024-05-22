import { StyleSheet } from 'react-native'
import { useNavigationState } from '@react-navigation/native'

import BaseTitle from '../../../base/Title'

export default function Title() {
	const screen = useNavigationState(state => state.routes[state.index].name)

	console.log(screen)

	return (
		<BaseTitle style={styles.title}>
			{screen === 'Sign Up' ? 'Sign up' : 'Sign in'} 
		</BaseTitle>
	)
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 28,
	},
})
