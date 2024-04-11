import { Image, StyleSheet, View } from 'react-native'

export default function AuthImage() {
	return (
		<View style={styles.container}>
			<Image source={require('../../../assets/img/travel-mates.jpg')} style={styles.img} testID='auth-img' />
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
		width: 266,
		height: 258,
	},
})