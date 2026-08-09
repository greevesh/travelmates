import { fetchUserCredentials, handleSignOut, removeAuthTokens, signOut } from '../../utils/auth'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { Icon } from 'react-native-paper'
import { handleError } from '@/utils/errorHandler'

export default function SignOutButton() {
	const onSubmit = async () => {
		const { username, refreshToken } = await fetchUserCredentials()
		try {
			await signOut(username, refreshToken)
			await handleSignOut()
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
