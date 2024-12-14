import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins'

import ProfilePhoto from './edit/ProfilePhoto'

export default function Navbar() {
	const [fontsLoaded] = useFonts({
		Poppins_600SemiBold
	})
    
	if (!fontsLoaded) {
		return null
	}

	return (
		<View style={styles.container}>
			<View style={styles.navbar}>
				<View style={styles.logoContainer}>
					<View style={styles.textContainer}>
						<Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#fff' }}>TravelM@tes</Text>
					</View>
				</View>
				<ProfilePhoto size={55} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 130,
		backgroundColor: 'rgba(0, 0, 0, 0)',
		zIndex: 1
	},
	navbar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 60,
		marginHorizontal: 10,
	},
	logoContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	textContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginLeft: 10
	}
})