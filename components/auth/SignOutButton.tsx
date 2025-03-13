import { useAuthStore } from '../../stores/useAuthStore'
import { fetchUserCredentials, removeAuthTokens, signOut } from '../../utils/auth'
import { TouchableOpacity, View, StyleSheet, Text, Alert } from 'react-native'
import { Icon } from 'react-native-paper'
import { router } from 'expo-router'
import { useCurrentUserStore } from '@/stores/useProfilePhotoStore'

export default function SignOutButton() {
	const setIsSignedIn = useAuthStore((state) => state.setIsSignedIn)
	const { setUploaded, setPhoto, setUsername } = useCurrentUserStore((state) => ({
		setUploaded: state.setUploaded,
		setPhoto: state.setPhoto,
		setUsername: state.setUsername
	}))

	const onSubmit = async () => {
		const { username, refreshToken, accessToken } = await fetchUserCredentials()
		try {
			await signOut(username, refreshToken)
			refreshToken && accessToken && await removeAuthTokens()
			setIsSignedIn(false)
			setUploaded(false)
			setPhoto('')
			setUsername('')
			router.push('/')
		}
		catch (err) {
			console.error('Error: There was a problem signing out: ', err)
			if (!refreshToken) {
				throw new Error('No refresh token available to sign out')
			}
			Alert.alert('There was a problem signing out.')
		}
	}

	return (
		<TouchableOpacity onPress={onSubmit} style={styles.container}>
          <View style={styles.btn}>
            <Icon size={20} source="logout" color='#fff' />
            <Text style={styles.text}>Sign out</Text>
          </View>
        </TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  padding: 10,
	  borderRadius: 5,
	  margin: 15,
	},
	btn: {
	  display: 'flex', 
	  flexDirection: 'row', 
	  alignItems: 'center'
	},
	text: {
	  marginLeft: 5,
	  fontSize: 20,
	  color: '#fff',
	  fontWeight: 500
	},
  })

function setUploaded(arg0: boolean) {
	throw new Error('Function not implemented.')
}
function setPhoto(arg0: string) {
	throw new Error('Function not implemented.')
}

