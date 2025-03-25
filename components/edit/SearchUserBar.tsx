import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Icon, Searchbar } from 'react-native-paper'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useUserStore } from '../../stores/useUserStore'
import { useFriendshipStore } from '../../stores/useFriendshipStore'
import { usersEndpoint } from '../../consts/api'
import { type User } from '../../stores/useUserStore'
import Output from '../setup/fourth-step/Output'
import React from 'react'
import debounce from '@/utils/debounce'
import { fetchUserCredentials } from '@/utils/auth'
import fetchCurrentUser from '@/utils/fetchCurrentUser'

export default function SearchUserBar() {
	const [query, setQuery] = useState<string>('')
	const [users, setUsers] = useState<Array<User>>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const { selectedUsers, setSelectedUsers, removeSelectedUser } = useUserStore((state) => ({
		selectedUsers: state.selectedUsers,
		setSelectedUsers: state.setSelectedUsers,
		removeSelectedUser: state.removeSelectedUser
	}))

	const { friendships, addFriendship, setFriendships } = useFriendshipStore((state) => ({
		friendships: state.friendships,
		addFriendship: state.addFriendship,
		setFriendships: state.setFriendships,
	}))

	const fetchUsers = async (input: string) => {
		try {
			setLoading(true)
			const {username, refreshToken} = await fetchUserCredentials()
			const res = await fetch(usersEndpoint + input, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${refreshToken}`,
					'X-Username': username || ''
				},
			})
			const data = await res.json()
			const filteredData = data.filter((user: { _id: number }) => !selectedUsers.some((selectedUser) => selectedUser._id === user._id))
			setUsers(filteredData)
		} catch (error) {
			console.error('Error: Failed to fetch users: ', error)
			setError('Failed to fetch users. Please try again.')
		}
		finally {
			setLoading(false)
		}
	}

	const debouncedFetchUsers = useCallback(debounce(fetchUsers, 300), [selectedUsers])

	const handleUserSelect = async (selectedUser: User) => {
		setSelectedUsers(selectedUser)
		const { _id } = await fetchCurrentUser()
		addFriendship(
			{
				recipientId: selectedUser._id,
				senderId: _id,
				status: 'pending'
			}
		)
		setUsers([])
		setQuery('')
	}

	const handleRemoveUser = (user: User) => {
		removeSelectedUser(user)
		const updatedFriendships = friendships.filter((friendship) => {
			return user._id !== friendship.recipientId
		})
		setFriendships(updatedFriendships)
	}

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

	return (
		<>
			<Searchbar
				inputStyle={{ marginTop: -5 }}
				mode='bar'
				style={styles.searchbar}
				value={query}
				onChangeText={(text) => {
					setQuery(text)
					text.length > 0 && debouncedFetchUsers(text)
				}}
				placeholder={"Search users"}
				clearIcon={loading ? () => <ActivityIndicator size="small" color="#007BFF" /> : undefined}
				onClearIconPress={() => setUsers([])}
				selectionColor={'#006994'}
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
					<TouchableOpacity onPress={() => handleUserSelect(user)} key={user._id} style={{ ...styles.resultItem, borderBottomWidth: index === users.length - 1 ? 0 : 1 }} accessibilityLabel={`Select ${user.username}`}>
							<View style={styles.skeletonLoader} />
							<Image 
								src={user.pic} 
								source={require('../../assets/img/placeholder-profile2.webp')} 
								style={styles.img} 
							/>
						<Text style={{ marginLeft: 10, fontWeight: '500' }}>{user.username}</Text>
					</TouchableOpacity>
				))}
			</View>
			<Output selectedUsers={selectedUsers} handleRemoveUser={handleRemoveUser} />
		</>
	)
}

const styles = StyleSheet.create({
	searchbar: {
		position: 'absolute',
		top: 20,
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
		top: 55,
		marginLeft: 25,
	},
	errorText: {
		marginLeft: 10,
		fontSize: 16
	},
	resultsContainer: {
		position: 'absolute',
		top: 50,
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