import { useAuthStore } from '../../stores/useAuthStore'
import { fetchUserCredentials, removeAuthTokens, signOut } from '../../utils/auth'
import { View, StyleSheet, Text, Alert, Pressable } from 'react-native'
import { Icon } from 'react-native-paper'
import { router } from 'expo-router'
import { useCurrentUserStore } from '@/stores/useProfilePhotoStore'
import { handleError } from '@/utils/errorHandler'
import { useTableStore } from '@/stores/useTableStore'

export default function SignOutButton() {
	const setIsSignedIn = useAuthStore((state) => state.setIsSignedIn)
	const { setUploaded, setPhoto, setUsername } = useCurrentUserStore((state) => ({
		setUploaded: state.setUploaded,
		setPhoto: state.setPhoto,
		setUsername: state.setUsername
	}))
	const setRows = useTableStore((state) => state.setRows)

	const onSubmit = async () => {
		const { username, refreshToken, accessToken } = await fetchUserCredentials()
		try {
			await signOut(username, refreshToken)
			refreshToken && accessToken && await removeAuthTokens()
			setIsSignedIn(false)
			setUploaded(false)
			setPhoto('')
			setUsername('')
			setRows([])
			router.push('/')
		}
		catch (err) {
			handleError(err, 'There was a problem signing out')
			if (!refreshToken) {
				throw new Error('No refresh token available to sign out')
			}
		}
	}

	return (
		<Pressable onPress={onSubmit} style={styles.container} >
          <View style={styles.btn}>
            <Icon size={20} source="logout" color='#fff' />
            <Text style={styles.text}>Sign out</Text>
          </View>
        </Pressable>
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
