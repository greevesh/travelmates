import { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useTripStore } from '../../stores/useTripStore'

import flags, { FlagMap } from "../../flag-emojis"

export default function SearchLocationBar() {
	const [places, setPlaces] = useState<Array<{ place_id: string; description: string }>>([])
	const [error, setError] = useState<string | null>(null)

	const query = useTripStore((state) => state.locationQuery)
	const setQuery = useTripStore((state) => state.setLocationQuery)
	const setLocation = useTripStore((state) => state.setLocation)

	const fetchPlaces = async (input: string) => {
		const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}&language=en&types=(cities)`
		try {
			const response = await fetch(url)
			const data = await response.json()
			setPlaces(data.predictions)
			setError(null)
		} catch (error) {
			setError('Failed to fetch places. Please try again.')
		}
	}

	const handleLocationChange = (placeName: string) => {
		setLocation(placeName)
		setQuery(placeName)
		setPlaces([])
	}

	const shortenPlaceName = (placeName: string) => {
		let shortened: string
		let cutOffPoint: number
		placeName[26] === " " ? cutOffPoint = 26 : cutOffPoint = 27
		let end = placeName.slice(cutOffPoint, placeName.length)
		shortened = placeName.replace(end, '...')
		return shortened
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

	return (
		<>
			<Searchbar
				inputStyle={{ marginTop: -5 }}
				mode='bar'
				style={styles.searchbar}
				value={query.length > 27 ? shortenPlaceName(query) : query}
				onChangeText={(text) => {
					setQuery(text)
					fetchPlaces(text)
				}}
				placeholder="Search location"
				onClearIconPress={() => setLocation(undefined)}
				selectionColor={'#006994'}
			/>
			{error && <Text style={styles.errorText}>{error}</Text>}
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
		backgroundColor: '#f0f0f0'
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
		columnGap: 8,
		padding: 12,
		borderColor: '#ccc',
	},
	errorText: {
		marginTop: 10,
	},
})