import { Image, StyleSheet, View } from 'react-native'

export default function AuthImage() {
	return (
		<View style={styles.container}>
			<Image source={require('../../assets/img/travel-mates.jpg')} style={styles.img} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20
	},
	img: {
		width: 186,
		height: 148,
		marginTop: 40
	},
})