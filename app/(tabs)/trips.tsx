import Spinner from "@/components/base/Spinner"
import Title from "@/components/base/Title"
import EndDatePicker from "@/components/edit/EndDatePicker"
import SearchLocationBar from "@/components/edit/SearchLocationBar"
import StartDatePicker from "@/components/edit/StartDatePicker"
import { tripEndpoint } from "@/consts/api"
import { useTripStore } from "@/stores/useTripStore"
import { fetchUserCredentials } from "@/utils/auth"
import fetchCurrentUser from "@/utils/fetchCurrentUser"
import fetchCurrentUserTrip from "@/utils/fetchCurrentUserTrip"
import axios from "axios"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { Button } from "react-native-paper"

interface Trips {
    location: undefined | string
    startDate: undefined | Date
    endDate: undefined | Date
}

export default function Trips() {
    const [loading, setLoading] = useState<boolean>(false)
    const [trips, setTrips] = useState<Trips[]>([{ location: undefined, startDate: undefined, endDate: undefined }])

    const { location, startDate, endDate } = useTripStore((state) => ({
        location: state.location,
        startDate: state.startDate,
        endDate: state.endDate
    }))

    const btnDisabled = !location || !startDate || !endDate

    const fetchTrips = async () => {
        try {
            const { location, startDate, endDate } = await fetchCurrentUserTrip()
            console.log('fetched trip: ', { location, startDate, endDate })
            setTrips([{ location, startDate, endDate }])
        }
        catch (err) {
            console.error('Error fetching trips: ', err)
        }
    }

    const handlePostTrip = async () => {
        setLoading(true)
        const { username, refreshToken } = await fetchUserCredentials()
        const { _id } = await fetchCurrentUser()
        try {
            const user = { 
				username, 
				refreshToken 
			}
            const trip = {
                startDate,
                endDate,
                location,
                userId: _id
            }
            const res = await axios.post(tripEndpoint, { user, trip },
                {
					headers: {
						'Authorization': `Bearer ${user.refreshToken}`
					}
				}
			)
			console.log('data: ', res.data)
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

    useEffect(() => {
        fetchTrips()
    }, [])

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
		height: 350,
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