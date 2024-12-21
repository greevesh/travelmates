import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Icon, IconButton, Searchbar } from 'react-native-paper'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useUserStore } from '../../stores/useUserStore'
import { useFriendshipStore } from '../../stores/useFriendshipStore'
import { usersEndpoint } from '../../consts/api'
import { type User } from '../../stores/useUserStore'

export default function SearchUserBar() {
	const [query, setQuery] = useState<string>('')
	const [users, setUsers] = useState<Array<User>>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [refreshToken] = useState<string | null>("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkdyZWV2ZXNsIiwiaWF0IjoxNzMyOTIwNDEyLCJleHAiOjE3MzMwMDY4MTJ9.9H-U_JUzRy3T_yxpIL8z3xIlLcnHmIcVWzO-ut3xItY")

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

	const debounce = <T extends (...args: string[]) => void>(func: T, wait: number) => {
		let timeoutId: ReturnType<typeof setTimeout> | null = null
  
		return (...args: Parameters<T>) => {
			timeoutId !== null && clearTimeout(timeoutId)
			timeoutId = setTimeout(() => {
				func(...args)
			}, wait)
		}
	}

	const user = { 
		username: 'Greevesl', 
		password: 'Burgcoffee5!',
		pic: 'https://via.placeholder.com/157.jpg', 
		refreshToken: refreshToken 
	}

	const fetchUsers = async (input: string) => {
		try {
			setLoading(true)
			const res = await fetch(usersEndpoint + input, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${refreshToken}`,
					'X-Username': user.username
				},
			})
			const data = await res.json()
			data.length === 0 && setError(`No results found for ${query}.`)
			const filteredData = data.filter((user: { _id: number }) => !selectedUsers.some((selectedUser) => selectedUser._id === user._id))
			setUsers(filteredData)
		} catch (error) {
			console.log('err', error)
			setError('Failed to fetch users. Please try again.')
		}
		finally {
			setLoading(false)
		}
	}

	const debouncedFetchUsers = useCallback(debounce(fetchUsers, 300), [selectedUsers])

	function generateRandom9DigitNumber(): number {
		const min = 100000000
		const max = 999999999
		const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNum
	}

	const handleUserSelect = (user: User) => {
		setSelectedUsers(user)
		addFriendship(
			{
				_id: generateRandom9DigitNumber(),
				recipientId: generateRandom9DigitNumber(),
				senderId: generateRandom9DigitNumber(),
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
		console.log('friendships: ', friendships)
	}, [selectedUsers, friendships])

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
				placeholder="Search users"
				clearIcon={loading ? () => <ActivityIndicator size="small" color="#007BFF" /> : undefined}
				onClearIconPress={() => setUsers([])}
				selectionColor={'#006994'}
			/>
			{error && 
			<View style={styles.errorContainer}>
				<Icon size={18} source='magnify-close' />
				<Text style={styles.errorText}>{error}</Text>
			</View>
			}
			<View style={styles.resultsContainer}>
				{users.slice(0, 5).map((user) => (
					<TouchableOpacity onPress={() => handleUserSelect(user)} key={user._id} style={styles.resultItem} accessibilityLabel={`Select ${user.username}`}>
						<Image source={require('../../assets/img/travel-mates.jpg')} style={styles.img} />
						<Text>{user.username}</Text>
					</TouchableOpacity>
				))}
			</View>
			<View style={styles.outputContainer}>
				{selectedUsers.map((user) => (
					<View key={user._id} style={styles.output}>
						<Text>{user.username}</Text>
						<IconButton style={styles.icon} size={18} icon="close" onPress={() => handleRemoveUser(user)} accessibilityLabel={`Remove ${user.username}`} />
					</View>
				))}
			</View>
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
		top: 15,
		marginLeft: 25,
	},
	errorText: {
		marginLeft: 10,
		fontSize: 18
	},
	resultsContainer: {
		position: 'absolute',
		top: 50,
		width: 280,
		marginTop: 10,
		backgroundColor: '#fff',
		borderColor: '#ccc',
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
	img: {
		width: 35,
		height: 35,
		borderRadius: 25,
	},
	outputContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 7,
	},
	output: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
		paddingHorizontal: 10,
		backgroundColor: '#f0f0f0',
		borderWidth: 0.5,
		height: 30,
		borderRadius: 50
	},
	icon: {
		height: 20,
		width: 20,
		marginRight: 0
	}
})