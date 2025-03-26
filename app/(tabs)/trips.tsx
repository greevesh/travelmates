import BaseButton from "@/components/base/Button"
import Title from "@/components/base/Title"
import EndDatePicker from "@/components/edit/EndDatePicker"
import SearchLocationBar from "@/components/edit/SearchLocationBar"
import StartDatePicker from "@/components/edit/StartDatePicker"
import { useTripStore } from "@/stores/useTripStore"
import fetchCurrentUserTrip from "@/utils/fetchCurrentUserTrip"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"

interface Trips {
    location: undefined | string
    startDate: undefined | Date
    endDate: undefined | Date
}

export default function Trips() {
    const [trips, setTrips] = useState<Trips[]>([{ location: undefined, startDate: undefined, endDate: undefined }])

    const { locationQuery: query, startDate, endDate } = useTripStore((state) => ({
        locationQuery: state.locationQuery,
        startDate: state.startDate,
        endDate: state.endDate
    }))

    const btnDisabled = !query || !startDate || !endDate

    const fetchTrips = async () => {
        try {
            const { location, startDate, endDate } = await fetchCurrentUserTrip()
            console.log('fetched trip: ', { location, startDate, endDate })
            setTrips([{ location, startDate, endDate }])
        }
        catch (err) {
            console.log('Error fetching trips: ', err)
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
                            <BaseButton disabled={btnDisabled} onPress={() => console.log('pressed')} icon={{ source: 'plus', size: 20 }} text="Add Trip" bgColor="#4285F4" mb={20} w={110} />
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