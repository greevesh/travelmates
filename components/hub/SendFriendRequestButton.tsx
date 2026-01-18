import { StyleSheet } from 'react-native'
import { IconButton, Text, Button } from 'react-native-paper'
import { useState } from 'react'
import SearchUserBar from '../edit/SearchUserBar'
import React from 'react'
import WithModal from '../hoc/WithModal'
import { friendshipsEndpoint } from '@/consts/api'
import { fetchUserCredentials } from '@/utils/auth'
import axios from 'axios'
import { useFriendshipStore } from '@/stores/useFriendshipStore'

export default function SendFriendRequestButton() {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { friendships, clearFriendships } = useFriendshipStore((state) => ({
		friendships: state.friendships,
		clearFriendships: state.clearFriendships
	}))

    const handlePostData = async () => {
		setLoading(true)
        const { username, refreshToken } = await fetchUserCredentials()
		try {
            const user = { 
				username, 
				refreshToken 
			}
			const res = await axios.post(friendshipsEndpoint, { user, friendships },
				{
					headers: {
						'Authorization': `Bearer ${user.refreshToken}`
					}
				}
			)
			console.log('data: ', res.data)
			return res.data
		}
		catch (err) {
			
		}
		finally {
			setLoading(false)
            clearFriendships()
		}
	}

    return (
        <>
            <IconButton
                icon="account-plus"
                size={32}
                onPress={() => setVisible(true)}
                style={styles.icon}
            />
            <WithModal
                style={styles.modal}
                visible={visible}
				onClose={() => setVisible(false)}
            >
                <Text style={styles.title}>Send Friend Request</Text>
                <SearchUserBar style={{ marginTop: 100 }} />
                <Button onPress={handlePostData}>Send</Button>
            </WithModal>
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginTop: 4,
    },
    modal: {
        width: '90%',
        height: 300,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center',
        color: '#000',
    },
}) 