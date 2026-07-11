import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Button, Icon, Searchbar } from 'react-native-paper'
import { Image, StyleSheet, Text, View } from 'react-native'

import { useUserStore } from '../../stores/useUserStore'
import { friendRequestsEndpoint, usersEndpoint } from '../../consts/api'
import { type User } from '../../stores/useUserStore'
import React from 'react'
import debounce from '@/utils/debounce'
import axios from 'axios'
import fetchCurrentUser from '@/utils/fetchCurrentUser'
import { fetchUserCredentials, withAuthRetry } from '@/utils/auth'
import { handleError } from '@/utils/errorHandler'

enum FriendRequestStatus {
	PENDING = 'pending',
	ACCEPTED = 'accepted',
	REJECTED = 'rejected',
	BLOCKED = 'blocked'
}

enum FriendRequestType {
	INCOMING = 'incoming',
	OUTGOING = 'outgoing'
}

interface FriendRequest {
	senderId: string,
	recipientId: string,
	senderUsername: string,
	status: FriendRequestStatus,
	requestType: FriendRequestType
}

interface Friendship {
	recipientId: string,
}

export default function SearchUserBar() {
	const [query, setQuery] = useState<string>('')
	const [users, setUsers] = useState<Array<User>>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [loadingUserId, setLoadingUserId] = useState<string | null>(null)
	const [alreadyAddedUsers, setAlreadyAddedUsers] = useState<Array<string>>([])
	const [error, setError] = useState<string | null>(null)

	const { selectedUsers } = useUserStore((state) => ({
		selectedUsers: state.selectedUsers,
	}))

	const fetchUsers = async (input: string) => {
		try {
			setLoading(true)
			const { _id } = await fetchCurrentUser()
			const res = await withAuthRetry((headers) => fetch(usersEndpoint + input, {
				method: 'GET',
				headers,
			}))
			const userData = await res.json()
			const usersExceptCurrentUser = userData.filter((user: User) => user._id.toString() !== _id.toString())
			if (__DEV__) {
				console.log('users: ', users)
				console.log('current user id: ', _id)
			}
			setUsers(usersExceptCurrentUser)
		} catch (error) {
			handleError(error, 'Failed to fetch users')
			setError('Failed to fetch users. Please try again.')
		}
		finally {
			setLoading(false)
		}
	}

	const fetchAlreadyAddedUsers = async () => {
		const { _id } = await fetchCurrentUser()
		try {
			const res = await withAuthRetry((headers) => axios.get(friendRequestsEndpoint, {
				headers,
				params: {
                    status: 'pending',
                    senderId: _id,
					requestType: 'outgoing'
                }
			}))
			const pendingFriendRequests = res.data.pendingFriendRequests.map((friendship: Friendship) => friendship.recipientId)
			setAlreadyAddedUsers(pendingFriendRequests)
			return res.data
		}
		catch (err) {
			handleError(err, 'Failed to fetch friend requests')
		}
	}

	const handleSendFriendRequest = async (recipientId: string) => {
		setLoadingUserId(recipientId)
		const { _id } = await fetchCurrentUser()
		const { username, accessToken } = await fetchUserCredentials()
		try {
            const user = { 
				username: username || '', 
				accessToken: accessToken || ''
			}
			const friendRequest: FriendRequest = {
				senderId: _id,
				recipientId,
				senderUsername: user.username || '',
				status: FriendRequestStatus.PENDING,
				requestType: FriendRequestType.OUTGOING
			}
			const res = await withAuthRetry((headers) => axios.post(friendRequestsEndpoint, { user, friendRequest }, { headers }))
			setAlreadyAddedUsers([...alreadyAddedUsers, recipientId])
			if (__DEV__) console.log('pending friend reqs: ', res.data)
			return res.data
		}
		catch (err) {
			if (__DEV__) console.log('could not send friend request: ', err)
		}
		finally {
			setLoadingUserId(null)
		}
	}

	const debouncedFetchUsers = useCallback(debounce(fetchUsers, 300), [selectedUsers])

	useEffect(() => {
		if (!query) {
			setUsers([])
			setError(null)
		}
	}, [query, loading])

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (!users.length && query && !loading && !error) {
				setError(`No results found for ${query}.`)
			}
		}, 500)

		return () => clearTimeout(timeoutId)
	}, [users, query, loading])

	useEffect(() => {
		fetchAlreadyAddedUsers()
		if (__DEV__) console.log('added users: ', alreadyAddedUsers)
	}, [])

	useEffect(() => {
		if (__DEV__) console.log('selected users: ', selectedUsers)
	}, [selectedUsers])

	return (
		<>
			<Searchbar
				inputStyle={{ marginTop: -5 }}
				mode='bar'
				style={[styles.searchbar]}
				value={query}
				onChangeText={(text) => {
					setQuery(text)
					text.length > 0 && debouncedFetchUsers(text)
				}}
				placeholder={"Search users"}
				clearIcon={loading ? () => <ActivityIndicator size="small" color="#007BFF" /> : undefined}
				onClearIconPress={() => setUsers([])}
				selectionColor='#3a9fff'
				autoCorrect={false}
				readOnly={selectedUsers.length > 1}
			/>
			{error && 
			<View style={styles.errorContainer}>
				<Icon size={18} source='magnify-close' />
				<Text style={styles.errorText}>{error}</Text>
			</View>
			}
			<View style={styles.resultsContainer}>
				{users.slice(0, 5).map((user, index) => (
					<View key={user._id} style={{ ...styles.resultItem, borderBottomWidth: index === users.length - 1 ? 0 : 1 }} accessibilityLabel={`Select ${user.username}`}>
						<View style={styles.skeletonLoader} />
						<Image 
							src={user.pic} 
							source={require('../../assets/img/placeholder-profile2.webp')} 
							style={styles.img} 
						/>
						<Text style={{ left: 10, fontWeight: '500', width: 200 }}>{user.username}</Text>
						{!alreadyAddedUsers.includes(user._id.toString()) ? 
							<Button onPress={() => handleSendFriendRequest(user._id.toString())}>
								{!loadingUserId?.includes(user._id.toString()) 
								? 'Add friend' 
								: 
								<ActivityIndicator size="small" color="#007BFF" />}</Button> 
							:
							<Button disabled>Added</Button>
						}
					</View>		
				))}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	searchbar: {
		position: 'absolute',
		top: 90,
		height: 45,
		width: 345,
		borderRadius: 50,
		backgroundColor: '#f0f0f0',
		marginBottom: 15
	},
	errorContainer: {
		display: 'flex', 
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		top: 75,
		marginLeft: 25,
	},
	errorText: {
		marginLeft: 10,
		fontSize: 16
	},
	resultsContainer: {
		position: 'absolute',
		top: 125,
		width: 345,
		marginTop: 10,
		backgroundColor: '#f9f9f9',
		borderColor: '#f9f9f9',
		borderRadius: 8,
		zIndex: 1000
	},
	resultItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderColor: '#ccc',
		borderBottomWidth: 1,
	},
	skeletonLoader: {
		position: 'absolute',
		left: 10,
		width: 35,
		height: 35,
		borderRadius: 25,
		backgroundColor: '#e0e0e0',
	},
	img: {
		width: 35,
		height: 35,
		borderRadius: 25,
	},
})