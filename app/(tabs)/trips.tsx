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
import { View, StyleSheet, Alert, Text, FlatList } from "react-native"
import { Button, IconButton } from "react-native-paper"

interface Trip {
    id?: undefined | string
    userId: undefined | number
    location: undefined | string
    startDate: undefined | Date
    endDate: undefined | Date
}

export default function Trips() {
    const [createTripLoading, setCreateTripLoading] = useState<boolean>(false)
    const [deletingTripId, setDeletingTripId] = useState<string | null>(null)
    const [trips, setTrips] = useState<Trip[]>([{ id: undefined, userId: undefined, location: undefined, startDate: undefined, endDate: undefined }])

    const { location, startDate, endDate, tripDates, setLocationQuery, setStartDate, setEndDate, setTripDates } = useTripStore((state) => ({
        location: state.locationQuery,
        startDate: state.startDate,
        endDate: state.endDate,
        tripDates: state.tripDates,
        setLocationQuery: state.setLocationQuery,
        setStartDate: state.setStartDate,
        setEndDate: state.setEndDate,
        setTripDates: state.setTripDates,
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
        setCreateTripLoading(true)
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
            const trips = await fetchCurrentUserTrips()
            const { _id } = trips[trips.length - 1] // Fetch just added trip by id
            const tripWithId = { ...trip, id: _id }
            setTrips((prevTrips) => [...prevTrips, tripWithId])
            return res.data
        }
        catch(err) {
            Alert.alert('Failed to add trip. Please try again.')
            console.error('Error adding trip: ', err)
        }
        finally {
            setCreateTripLoading(false)
        }
    }

    const handleDeleteTrip = async (tripId: undefined | string) => {
        if (!tripId) return
        try {
            setDeletingTripId(tripId)
            const { username, refreshToken } = await fetchUserCredentials()
            await axios.delete(`${tripEndpoint}/${tripId}`, {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`,
                    'X-Username': username || ''
                }
            })
            setTrips((prevTrips) => prevTrips?.filter(trip => trip.id !== tripId))
            console.log(`Trip with id ${tripId} deleted successfully.`)
        } 
        catch (err) {
            Alert.alert('Failed to delete trip. Please try again.')
            console.error('Error deleting trip: ', err);
        }
        finally {
            setDeletingTripId(null)
        }
    }

    const fetchTripDates = () => {
        const dates: any[] = []
        trips.forEach((trip) => {
            let startDate = trip.startDate
            const endDate = trip.endDate
            if (startDate && endDate) {
                let currentIterationDate = startDate
                while (currentIterationDate <= endDate) {
                    dates.push(currentIterationDate.toDateString())
                    currentIterationDate = new Date(currentIterationDate)
                    currentIterationDate.setDate(currentIterationDate.getDate() + 1)
                }
            }
        })
        setTripDates(dates)
    }

    const sortTripDates = () => {
        const sortedDates = tripDates && tripDates.sort((a: string, b: string) => {
            const dateA = new Date(a)
            const dateB = new Date(b)
            if (dateA < dateB) {
                return - 1
            }
            if (dateA > dateB) {
                return 1
            }
            return 0
        })
        setTripDates(sortedDates)
    }

    useEffect(() => {
        fetchTrips()
    }, [])

    useEffect(() => {
        fetchTripDates()
    }, [trips])

    useEffect(() => {
        sortTripDates()
        console.log('trip dates: ', tripDates)
    }, [tripDates])

    return (
        <LinearGradient colors={['#3b5998', '#8b9dc3']}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.subcontainer}>
                        <Title style={styles.title}>Trips</Title>
                        <SearchLocationBar />
                        <View style={styles.dateContainer}>
                            <StartDatePicker />
                            <EndDatePicker />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button style={{ backgroundColor: `${btnDisabled ? 'rgba(66, 133, 244, 0.3)' : '#4285F4'}`, borderRadius: 5, width: 100 }} labelStyle={{ color: '#fff' }} disabled={btnDisabled} onPress={handlePostTrip}>{createTripLoading ? <Spinner /> : 'Add Trip'}</Button>
                        </View>
                        <FlatList
                            data={trips.filter(trip => trip.id)}
                            keyExtractor={(item) => item.id || ''}
                            contentContainerStyle={styles.tripsListContent}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item: trip }) => (
                                <View style={{ width: 330, marginTop: 15 }}>
                                    <View style={styles.tripContainer}>
                                        {deletingTripId === trip.id ?
                                            <Spinner style={{ top: 5, right: 10 }} />
                                            :
                                            <IconButton onPress={() => handleDeleteTrip(trip.id)} style={styles.deleteIcon} icon="delete" size={17} />
                                        }
                                        <View style={styles.trip}>
                                            <Text>{trip.location} - </Text>
                                            <Text>{trip.startDate?.toDateString()} - </Text>
                                            <Text>{trip.endDate?.toDateString()}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
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
        alignItems: 'center',
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
    subcontainer: {
        alignItems: 'center', 
        width: '100%', 
        overflow: 'scroll',
        
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
        width: '90%'
    },
    btnContainer: {
        width: '90%', 
        marginTop: 30, 
        marginLeft: 20,
        marginBottom: 20, 
        alignItems: 'flex-start'
    },
    tripContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        backgroundColor: '#E8E8E8', 
        borderWidth: 1.2, 
        borderRadius: 20, 
        padding: 10,
    },
    deleteIcon: {
        position: 'absolute', 
        top: -7, 
        right: -3
    },
    trip: {
        width: 285, 
        flexDirection: 'row', 
        flexWrap: 'wrap',
    },
    tripsListContent: {
        paddingBottom: 20,
        alignItems: 'center'
    },
})