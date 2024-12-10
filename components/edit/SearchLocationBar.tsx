import { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useTripStore } from '../../stores/useTripStore'

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

	const handleLocationChange = (place: string) => {
		setLocation(place)
		setQuery(place)
		setPlaces([])
	}

	return (
		<>
			<Searchbar
				inputStyle={{ marginTop: -5 }}
				mode='bar'
				style={styles.searchbar}
				value={query}
				onChangeText={(text) => {
					setQuery(text)
					fetchPlaces(text)
				}}
				placeholder="Search location"
				onClearIconPress={() => setLocation(undefined)}
			/>
			{error && <Text style={styles.errorText}>{error}</Text>}
			<View style={styles.resultsContainer}>
				{places.map((place) => (
					<TouchableOpacity onPress={() => handleLocationChange(place.description)} key={place.place_id} style={styles.resultItem}>
						<Text>{place.description}</Text>
					</TouchableOpacity>
				))}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	searchbar: {
		height: 45,
		width: 300,
		borderRadius: 50,
		backgroundColor: '#f0f0f0'
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
		padding: 10,
		borderColor: '#ccc',
		borderBottomWidth: 1
	},
	errorText: {
		marginTop: 10,
	},
})