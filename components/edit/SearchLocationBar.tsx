import { useEffect, useState } from 'react'
import { ActivityIndicator, Icon, Searchbar } from 'react-native-paper'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useTripStore } from '../../stores/useTripStore'

import flags, { FlagMap } from "../../flag-emojis"
import React from 'react'

export default function SearchLocationBar() {
	const [places, setPlaces] = useState<Array<{ place_id: string; description: string }>>([])
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const query = useTripStore((state) => state.locationQuery)
	const setQuery = useTripStore((state) => state.setLocationQuery)
	const setLocation = useTripStore((state) => state.setLocation)
	const location = useTripStore((state) => state.location)

	const MAX_QUERY_LENGTH = 17

	const fetchPlaces = async (input: string) => {
		setLoading(true)
		const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}&language=en&types=(cities)`
		try {
			const res = await fetch(url)
			const data = await res.json()
			setPlaces(data.predictions)
			setError(null)
		} catch (error) {
			setError('Failed to fetch places. Please try again.')
		}
		finally {
			setLoading(false)
		}
	}

	const handleLocationChange = (placeName: string) => {
		setLocation(placeName)
		setQuery(placeName)
		setPlaces([])
	}

	const formatPlaceName = (placeName: string) => {
		if (!placeName.includes(",")) {
			if (placeName.includes("United Arab Emirates")) {
				// e.g. Abu Dhabi - United Arab Emirates (should be Abu Dhabi, United...)
				return placeName.replaceAll(" - ", ", ")
			} else {
				if (placeName.includes("Saudi Arabia")) {
					return placeName.replace(" Saudi Arabia", ", Saudi Arabia")
				}
			}
		}
		return placeName
	}

	const getFlag = (placeName: string) => {
		const formattedPlaceName = formatPlaceName(placeName)
		let country = formattedPlaceName.split(", ").pop() || ''
		const flag = (flags as FlagMap)[country] || '🌎'
		return flag
	}

	useEffect(() => {
		const msg = `No results found for`
		const timeoutId = setTimeout(() => {
			if (!places.length && query && !loading && !error && !location) {
				if (query.length <= MAX_QUERY_LENGTH) {
					setError(`${msg} ${query}.`)
				}
				else {
					setError(`${msg} ${query.slice(0, MAX_QUERY_LENGTH)}.`)
				}
			}
		}, 500)

		return () => clearTimeout(timeoutId)
	}, [places, query, loading])

	return (
		<>
			<Searchbar
				inputStyle={{ marginTop: -5 }}
				mode='bar'
				style={styles.searchbar}
				value={query.length > MAX_QUERY_LENGTH ? query.slice(0, MAX_QUERY_LENGTH)
					: query}
				onChangeText={(text) => {
					setQuery(text)
					fetchPlaces(text)
				}}
				placeholder="Search location"
				onClearIconPress={() => setLocation(undefined)}
				selectionColor='#3a9fff'
				autoCorrect={false}
				clearIcon={loading ? () => <ActivityIndicator size="small" color="#007BFF" /> : undefined}
			/>
			{error &&
				<View style={styles.errorContainer}>
					<Icon size={18} source='magnify-close' />
					<Text style={styles.errorText}>{error}</Text>
				</View>
			}
			<View style={styles.resultsContainer}>
				{places.map(({ place_id, description }, index) => (
					<TouchableOpacity onPress={() => handleLocationChange(description)} 
						key={place_id} 
						style={{ ...styles.resultItem, borderBottomWidth: index === places.length - 1 ? 0 : 1 }}>
						<Text>{getFlag(description)}</Text>
						<Text>{description}</Text>
					</TouchableOpacity>
				))}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	searchbar: {
		height: 45,
		width: 345,
		borderRadius: 50,
		shadowColor: '#000',
		backgroundColor: '#f9f9f9',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3, // For Android
	},
	resultsContainer: {
		position: 'absolute',
		top: 118,
		width: 345,
		marginTop: 10,
		backgroundColor: '#f5f5f5',
		borderColor: '#f5f5f5',
		borderRadius: 8,
		zIndex: 1000
	},
	resultItem: {
		display: 'flex',
		flexDirection: 'row',
		columnGap: 8,
		padding: 12,
		borderColor: '#ccc',
	},
	errorContainer: {
		position: 'absolute',
		display: 'flex', 
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		top: 150,
		left: 25,
	},
	errorText: {
		marginLeft: 10,
		fontSize: 16
	},
})