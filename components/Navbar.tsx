import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useFonts, Inter_600SemiBold } from '@expo-google-fonts/inter'

import ProfilePhoto from './edit/ProfilePhoto'

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
					<View style={styles.textContainer}>
						<Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 20, color: '#fff' }}>TravelM@tes</Text>
					</View>
				</View>
				<ProfilePhoto size={55} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 130,
		backgroundColor: '#72C6EF'
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