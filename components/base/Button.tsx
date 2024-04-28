import { GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native'
import { Icon } from 'react-native-paper'

interface IBaseButtonProps {
	onPress: (event: GestureResponderEvent) => void
    text: string
	bgColor: string
	icon?: {
		source: string
		size: number
	}
	testId: string
}

export default function BaseButton({onPress, bgColor, icon, text, testId}: IBaseButtonProps) {
	return (
		<Pressable onPress={onPress} style={[styles.button, { backgroundColor: bgColor }]} testID={testId}>
			{icon && <Icon size={icon.size} source={icon.source} color='#fff' /> }
			<Text style={styles.text}>{text}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 4,
		height: 48,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		columnGap: 10,
		width: '100%',
		marginTop: 20,
	},
	text: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
})