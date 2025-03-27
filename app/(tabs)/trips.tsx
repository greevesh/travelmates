import Spinner from "@/components/base/Spinner"
import Title from "@/components/base/Title"
import EndDatePicker from "@/components/edit/EndDatePicker"
import SearchLocationBar from "@/components/edit/SearchLocationBar"
import StartDatePicker from "@/components/edit/StartDatePicker"
import { tripEndpoint } from "@/consts/api"
import { useTripStore } from "@/stores/useTripStore"
import { fetchUserCredentials } from "@/utils/auth"
import fetchCurrentUser from "@/utils/fetchCurrentUser"
import fetchCurrentUserTrips from "@/utils/fetchCurrentUserTrip"
import axios from "axios"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { View, StyleSheet, Alert, Text } from "react-native"
import { Button, IconButton } from "react-native-paper"
import { v4 as uuidv4 } from "uuid"

interface Trip {
    id: undefined | string
    userId: undefined | number
    location: undefined | string
    startDate: undefined | Date
    endDate: undefined | Date
}

export default function Trips() {
    const [loading, setLoading] = useState<boolean>(false)
    const [trips, setTrips] = useState<Trip[]>([{ id: undefined, userId: undefined, location: undefined, startDate: undefined, endDate: undefined }])

    const { location, startDate, endDate, setLocationQuery, setStartDate, setEndDate } = useTripStore((state) => ({
        location: state.locationQuery,
        startDate: state.startDate,
        endDate: state.endDate,
        setLocationQuery: state.setLocationQuery,
        setStartDate: state.setStartDate,
        setEndDate: state.setEndDate
    }))

    const btnDisabled = !location || !startDate || !endDate

    const fetchTrips = async () => {
        try {
            const loadedTrips: Trip[] = []
            const fetchedTrips = await fetchCurrentUserTrips()
            fetchedTrips.forEach((trip: any) => {
                let { _id: id, userId, startDate, endDate, location } = trip
                startDate = new Date(startDate)
                endDate = new Date(endDate)
                loadedTrips.push({ id, userId, startDate, endDate, location })
            })
            console.log('loaded trips: ', loadedTrips)
            setTrips(loadedTrips)
        }
        catch (err) {
            console.error('Error fetching trips: ', err)
        }
    }

    const handlePostTrip = async () => {
        setLoading(true)
        const { username, refreshToken } = await fetchUserCredentials()
        const { _id } = await fetchCurrentUser()
        const user = { username, refreshToken }
        const trip = { userId: _id, startDate, endDate, location }
        try {
            const res = await axios.post(tripEndpoint, { user, trip },
                {
					headers: {
						'Authorization': `Bearer ${user.refreshToken}`
					}
				}
			)
			console.log('data: ', res.data)
            setLocationQuery('')
            setStartDate(undefined)
            setEndDate(undefined)
            const tripWithId = { ...trip, id: uuidv4() }
            setTrips((prevTrips) => [...prevTrips, tripWithId])
            return res.data
        }
        catch(err) {
            Alert.alert('Failed to add trip. Please try again.')
            console.error('Error adding trip: ', err)
        }
        finally {
            setLoading(false)
        }
    }

    const handleDeleteTrip = async (tripId: undefined | string) => {
        if (!tripId) return

        try {
            const { username, refreshToken } = await fetchUserCredentials()
            await axios.delete(`${tripEndpoint}/${tripId}`, {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`,
                    'X-Username': username || ''
                }
            });
            setTrips((prevTrips) => prevTrips.filter(trip => trip.id !== tripId));
            console.log(`Trip with id ${tripId} deleted successfully.`);
        } catch (err) {
            Alert.alert('Failed to delete trip. Please try again.');
            console.error('Error deleting trip: ', err);
        }
    }

    useEffect(() => {
        fetchTrips()
    }, [])

    useEffect(() => {
        console.log('trips: ', trips)
    }, [trips])

    return (
        <LinearGradient colors={['#3b5998', '#8b9dc3']}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Title style={styles.title}>Trips</Title>
                        <SearchLocationBar />
                        <View style={styles.dateContainer}>
                            <StartDatePicker />
                            <EndDatePicker />
                        </View>
                        <View style={{ width: '90%', marginLeft: 20 }}>
                            <Button disabled={btnDisabled} onPress={handlePostTrip}>{loading ? <Spinner /> : 'Add Trip'}</Button>
                        </View>
                        <View>
                            {
                                trips && (
                                    trips.map((trip) => (
                                        trip.id && (
                                            <View style={{ width: 330, marginTop: 10 }} key={trip?.id}>
                                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#E8E8E8', borderWidth: 1.2, borderRadius: 20, padding: 10 }}>
                                                <IconButton onPress={() => handleDeleteTrip(trip.id)} style={{ position: 'absolute', top: -7, right: -3 }} icon="delete" size={17} />
                                                <View style={{ width: 285, flexDirection: 'row', flexWrap: 'wrap' }}>
                                                    <Text>{trip.location} - </Text>
                                                    <Text>{trip.startDate?.toDateString()} - </Text>
                                                    <Text>{trip.endDate?.toDateString()}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        )
                                    ))
                                )
                            }
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    card: {
        width: '90%',
		borderWidth: 1,
        borderRadius: 20,
		borderColor: '#d3d3d3',
		backgroundColor: '#fff',
		height: 500,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
		textAlign: 'center',
        margin: 20
    },
    dateContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        marginTop: 20,
        marginLeft: 0,
        width: '90%',
    }
})