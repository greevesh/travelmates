import { GestureResponderEvent, Pressable, StyleSheet } from 'react-native'
import { Icon } from 'react-native-paper'

interface EyeProps {
  onPress: (event: GestureResponderEvent) => void;
  icon: string;
  top: number;
}

export default function Eye({ onPress, icon, top }: EyeProps) {
	return (
		<Pressable onPress={onPress} style={[styles.container, { top }]}>
			<Icon size={20} source={icon} />
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		right: 10,
	},
})
