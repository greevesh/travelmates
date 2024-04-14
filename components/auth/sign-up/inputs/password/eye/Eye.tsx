import { View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-paper'

interface EyeProps {
    top: number
}

export default function Eye({top}: EyeProps) {
	return (
		<View style={[styles.container, { top }]}>
			<Icon size={20} source="eye-off-outline" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		right: 10,
	},
})