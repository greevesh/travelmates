import fetchCurrentUser from "@/utils/fetchCurrentUser"
import fetchCurrentUserTrip from "@/utils/fetchCurrentUserTrip"
import { View, Text } from "react-native"

export default function Hub() {
    const logCurrentUser = async () => {
        const currentUser = await fetchCurrentUser()
        console.log('current user: ', currentUser)
    }

    const logCurrentUserTrip = async () => {
        const currentUserTrip = await fetchCurrentUserTrip()
        console.log('current user trip: ', currentUserTrip)
    }

    logCurrentUser()
    logCurrentUserTrip()

    return (
        <View>
            <Text>This is the hub page.</Text>
        </View>
    )
}