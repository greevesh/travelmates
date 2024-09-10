import { Image, StyleSheet, View } from 'react-native'

interface ILogoProps {
	size?: number
}

export default function Logo({ size }: ILogoProps) {
	return (
		<View style={styles.container}>
			{size ? <Image source={require('../assets/img/travel-mates.jpg')} style={{ height: size, width: size, borderRadius: size / 2 }} /> 
				: <Image source={require('../assets/img/travel-mates.jpg')} style={styles.img} />}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
	},
	img: {
		width: 186,
		height: 148,
		marginTop: 40
	},
})