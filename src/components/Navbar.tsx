import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import {  useFonts, Inter_600SemiBold } from '@expo-google-fonts/inter'

import ProfilePhoto from './edit/ProfilePhoto'
import Logo from './Logo'

export default function Navbar() {
	const [fontsLoaded] = useFonts({
		Inter_600SemiBold,
	})
    
	if (!fontsLoaded) {
		return null
	}

	return (
		<View style={styles.container}>
			<View style={styles.navbar}>
				<View style={styles.logoContainer}>
					<Logo size={55} />
					<View style={styles.textContainer}>
						<Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16 }}>TravelMates</Text>
					</View>
				</View>
				<ProfilePhoto size={55} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 150,
	},
	navbar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 40,
		marginHorizontal: 10
	},
	logoContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	textContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	}
})