import Spinner from "@/components/base/Spinner"
import Title from "@/components/base/Title"
import EndDatePicker from "@/components/edit/EndDatePicker"
import SearchLocationBar from "@/components/edit/SearchLocationBar"
import StartDatePicker from "@/components/edit/StartDatePicker"
import { tripEndpoint } from "@/consts/api"
import { useTripStore } from "@/stores/useTripStore"
import { getAuthContext, withAuthRetry } from "@/utils/auth"
import fetchCurrentUser from "@/utils/fetchCurrentUser"
import axios from "axios"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { View, StyleSheet, Text, FlatList } from "react-native"
import { Button, Icon, IconButton } from "react-native-paper"
import { handleApiError, handleError } from "@/utils/errorHandler"
import PlaneIcon from "@/components/base/PlaneIcon"
import { Trip } from "@/types"
import { useTripsStore } from "@/stores/useTripsStore"
import handleLocationLength from "@/utils/handleLocationLength"

export default function Trips() {
    const [createTripLoading, setCreateTripLoading] = useState<boolean>(false)
    const [deletingTripId, setDeletingTripId] = useState<string | null>(null)
    const [currentUserTrips, setCurrentUserTrips] = useState<Trip[]>([])

    const { trips, setTrips, addTrip } = useTripsStore((state) => ({
        trips: state.trips,
        setTrips: state.setTrips,
        addTrip: state.addTrip
    }))

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

    const handleFetchCurrentUserTrips = async () => {
        try {
            const { _id } = await fetchCurrentUser()
            const currentUserTrips = trips.filter((trip: Trip) => trip.userId === _id)
            setCurrentUserTrips(currentUserTrips)
        }
        catch (err) {
            handleApiError(err, 'Error fetching trips')
        }
    }

    const handlePostTrip = async () => {
        setCreateTripLoading(true)
        try {
            const { username, accessToken } = await getAuthContext()
            const { _id } = await fetchCurrentUser()
            const userCredentials = { username, accessToken }
            let trip = { userId: _id, startDate, endDate, location }
            const res = await withAuthRetry((retryHeaders) => axios.post(tripEndpoint, { userCredentials, trip }, { headers: retryHeaders }))
			if (__DEV__) console.log('data: ', res.data)
            setLocationQuery('')
            setStartDate(undefined)
            setEndDate(undefined)
            addTrip(res.data)
            return res.data
        }
        catch (err) {
            if (err instanceof Error && err.message === 'Missing user credentials') {
                handleError(new Error('Missing credentials'), 'Unable to create trip')
            } else {
                handleError(err, 'Failed to add trip. Please try again.')
            }
        }
        finally {
            setCreateTripLoading(false)
        }
    }

    const handleDeleteTrip = async (tripId: undefined | string) => {
        if (!tripId) return
        try {
            setDeletingTripId(tripId)
            await withAuthRetry((headers) => axios.delete(`${tripEndpoint}/${tripId}`, { headers }))
            setTrips(trips.filter(trip => trip._id !== tripId))
        } 
        catch (err) {
            if (err instanceof Error && err.message === 'Missing user credentials') {
                handleError(new Error('Missing credentials'), 'Unable to delete trip')
            } else {
                handleError(err, 'Failed to delete trip. Please try again.')
            }
        }
        finally {
            setDeletingTripId(null)
        }
    }

    const fetchTripDates = () => {
        const dates: string[] = []
        currentUserTrips && currentUserTrips.forEach((trip) => {
            let startDate = new Date(trip.startDate)
            const endDate = new Date(trip.endDate)
            if (startDate && endDate) {
                let currentIterationDate = startDate
                while (currentIterationDate <= endDate) {
                    dates.push(currentIterationDate.toDateString())
                    currentIterationDate.setDate(currentIterationDate.getDate() + 1)
                }
            }
        })
        setTripDates(dates)
    }

    const sortTripDates = () => {
        if (!tripDates || tripDates.length <= 1) return
        const sortedTripDates = tripDates && [...tripDates].sort((a: string, b: string) => {
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
        setTripDates(sortedTripDates)
    }

    useEffect(() => {
        handleFetchCurrentUserTrips()
    }, [trips])

    useEffect(() => {
        fetchTripDates()
        sortTripDates()
    }, [currentUserTrips])

    return (
        <LinearGradient colors={['#8ec5fc', '#5f93d3']}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.subcontainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <PlaneIcon style={{ top: 10, right: 200 }} />
                            <Title style={styles.title}>Trips</Title>
                        </View>
                        <SearchLocationBar />
                        <View style={styles.dateContainer}>
                            <StartDatePicker />
                            <EndDatePicker />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button style={[styles.addTripBtn, { backgroundColor: `${btnDisabled ? 'rgba(66, 133, 244, 0.3)' : '#3a9fff'}` }]} labelStyle={{ color: '#fff' }} disabled={btnDisabled} onPress={handlePostTrip}>
                                {createTripLoading ? <Spinner color="#fff" /> : <Text style={{ fontSize: 18, textAlign: 'center' }}>Add Trip</Text>}
                            </Button>
                        </View>
                        <FlatList
                            data={currentUserTrips.filter(trip => trip._id)}
                            keyExtractor={(item) => item._id || ''}
                            contentContainerStyle={styles.tripsListContent}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item: trip }) => (
                                <View style={{ width: 330, marginTop: 15 }}>
                                    <View style={styles.tripContainer}>
                                        {deletingTripId === trip._id ?
                                            <Spinner style={styles.spinner} color="#3a9fff" />
                                            :
                                            <IconButton onPress={() => handleDeleteTrip(trip._id)} style={styles.deleteIcon} icon="delete" size={25} />
                                        }
                                        <View style={styles.trip}>
                                            <Icon color='#b22222' source="map-marker" size={25} />
                                            <Text style={styles.locationText}>{handleLocationLength(trip.location, 28)}</Text>
                                            <View style={styles.dateTextContainer}>
                                                <Text style={{ fontSize: 13 }}>{new Date(trip.startDate).toDateString()} - </Text>
                                                <Text style={{ fontSize: 13 }}>{new Date(trip.endDate).toDateString()}</Text>
                                            </View>
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
		borderColor: '#e8eaed',
		backgroundColor: '#fff',
		height: 500,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    subcontainer: {
        alignItems: 'center', 
        width: '100%', 
        overflow: 'scroll',
    },
    title: {
        fontSize: 36,
		textAlign: 'center',
        margin: 20,
        fontWeight: 600
    },
    dateContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 50,
        marginLeft: 0,
        width: '90%'
    },
    btnContainer: {
        width: '90%', 
        marginTop: 30, 
        marginBottom: 20, 
        alignItems: 'flex-start'
    },
    addTripBtn: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
        borderRadius: 25, 
        width: 345, 
        height: 45, 
        justifyContent: 'center',
    },
    tripContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        backgroundColor: '#f9f9f9',
        height: 80,
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#eceff4',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
    },
    spinner: {
        height: 80,
        width: 80,
        right: -20
    },
    deleteIcon: {
        position: 'absolute', 
        top: 12, 
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
    locationText: {
        fontWeight: 600, 
        fontSize: 16, 
        marginTop: 3, 
        marginLeft: 15
    },
    dateTextContainer: {
        flexDirection: 'row', 
        marginTop: 10, 
        marginLeft: 40
    }
})
