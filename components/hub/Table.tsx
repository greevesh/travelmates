import fetchCurrentUserTrip from "@/utils/fetchCurrentUserTrip"
import { useEffect } from "react"
import { View, Text } from "react-native"

export default function Table() {
    const parseAndLogCurrentUserTrip = async () => {
        try {
            const currentUserTrip = await fetchCurrentUserTrip()
            const location = currentUserTrip.location
            const startDate = new Date(currentUserTrip.startDate)
            const endDate = new Date(currentUserTrip.endDate)
            const startDay = startDate.getDate()
            const endDay = endDate.getDate()
            console.log('location: ', location)
            console.log('start date: ', startDate)
            console.log('end date: ', endDate)
            console.log('start day: ', startDay)
            console.log('end day: ', endDay)
        }
        catch (err) {
            console.error('Error storing current trip data: ', err)
        }
    }

    useEffect(() => {
        parseAndLogCurrentUserTrip()
    }, [])

    // logCurrentUser()

    return (
        <View>
            <Text>This is where the grid should be.</Text>
        </View>
    )
}