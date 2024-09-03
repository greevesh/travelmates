import { ReactNode } from 'react'
import { GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native'
import { Icon } from 'react-native-paper'

interface IBaseButtonProps {
	onPress: (event: GestureResponderEvent) => void
    text: string
	bgColor: string
	w?: number
	icon?: {
		source: string
		size: number
	}
	mb?: number
	children?: ReactNode
}

export default function BaseButton({ onPress, children, bgColor, w, mb, icon, text }: IBaseButtonProps) {
	return (
		<Pressable onPress={onPress} style={[styles.button, { backgroundColor: bgColor, width: w, marginBottom: mb }]}>
			{icon && <Icon size={icon.size} source={icon.source} color='#fff' /> }
			<Text style={styles.text}>{text}</Text>
			{children && children}
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
		marginTop: 20,
	},
	text: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
})