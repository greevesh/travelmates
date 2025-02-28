import fetchCurrentUser from "@/utils/fetchCurrentUser"
import { View, Text } from "react-native"

export default function Hub() {
    const logCurrentUser = async () => {
        const currentUser = await fetchCurrentUser()
        console.log('current user: ', currentUser)
    }

    logCurrentUser()

    return (
        <View>
            <Text>This is the hub page.</Text>
        </View>
    )
}