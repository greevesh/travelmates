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
import { handleError } from "@/utils/errorHandler"
import fetchCurrentUserTrips from "@/utils/fetchCurrentUserTrips"

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

    const handleFetchTrips = async () => {
        try {
            const loadedTrips: Trip[] = []
            const fetchedTrips = await fetchCurrentUserTrips()
            fetchedTrips.forEach((trip: any) => {
                let { _id: id, userId, startDate, endDate, location } = trip
                startDate = new Date(startDate)
                endDate = new Date(endDate)
                loadedTrips.push({ id, userId, startDate, endDate, location })
            })
            if (__DEV__) console.log('loaded trips: ', loadedTrips)
            setTrips(loadedTrips)
            return loadedTrips
        }
        catch (err) {
            handleError(err, 'Error fetching trips')
        }
    }

    const handlePostTrip = async () => {
        setCreateTripLoading(true)
        try {
            const { username, accessToken } = await getAuthContext()
            const { _id } = await fetchCurrentUser()
            const user = { username, accessToken }
            const trip = { userId: _id, startDate, endDate, location }
            const res = await withAuthRetry((retryHeaders) => axios.post(tripEndpoint, { user, trip }, { headers: retryHeaders }))
			if (__DEV__) console.log('data: ', res.data)
            setLocationQuery('')
            setStartDate(undefined)
            setEndDate(undefined)
            await handleFetchTrips()
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
            setTrips((prevTrips) => prevTrips?.filter(trip => trip.id !== tripId))
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
        handleFetchTrips()
    }, [])

    useEffect(() => {
        fetchTripDates()
    }, [trips])

    useEffect(() => {
        sortTripDates()
        if (__DEV__) console.log('trip dates: ', tripDates)
    }, [tripDates])

    return (
        <LinearGradient colors={['#8ec5fc', '#5f93d3']}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.subcontainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.planeContainer}>
                                <Icon size={40} source="airplane" color='#3a9fff' />
                            </View>
                            <Title style={styles.title}>Trips</Title>
                        </View>
                        <SearchLocationBar />
                        <View style={styles.dateContainer}>
                            <StartDatePicker />
                            <EndDatePicker />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button style={[styles.addTripBtn, { backgroundColor: `${btnDisabled ? 'rgba(66, 133, 244, 0.3)' : '#3a9fff'}` }]} labelStyle={{ color: '#fff' }} disabled={btnDisabled} onPress={handlePostTrip}>
                                {createTripLoading ? <Spinner /> : <Text style={{ fontSize: 18, textAlign: 'center' }}>Add Trip</Text>}
                            </Button>
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
                                            <Spinner style={styles.spinner} />
                                            :
                                            <IconButton onPress={() => handleDeleteTrip(trip.id)} style={styles.deleteIcon} icon="delete" size={25} />
                                        }
                                        <View style={styles.trip}>
                                            <Icon color='#b22222' source="map-marker" size={25} />
                                            <Text style={styles.locationText}>{trip.location}</Text>
                                            <View style={styles.dateTextContainer}>
                                                <Text style={{ fontSize: 13 }}>{trip.startDate?.toDateString()} - </Text>
                                                <Text style={{ fontSize: 13 }}>{trip.endDate?.toDateString()}</Text>
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
		borderColor: '#d3d3d3',
		backgroundColor: '#fff',
		height: 500,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10, 
        elevation: 5
    },
    subcontainer: {
        alignItems: 'center', 
        width: '100%', 
        overflow: 'scroll',
    },
    planeContainer: {
        position: 'absolute', 
        top: 20, 
        left: -100
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
        marginTop: 20,
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        borderRadius: 25, 
        width: 345, 
        height: 45, 
        justifyContent: 'center'
    },
    tripContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        backgroundColor: '#f9f9f9',
        height: 80,
        borderRadius: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5, 
        elevation: 5
    },
    spinner: {
        position: 'absolute', 
        top: 2, 
        right: -15,
        color: '#3a9fff',
        height: 80,
        width: 80
    },
    deleteIcon: {
        position: 'absolute', 
        top: 15, 
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