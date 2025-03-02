import fetchCurrentUser from "@/utils/fetchCurrentUser"
import fetchCurrentUserTrip from "@/utils/fetchCurrentUserTrip"
import { useEffect, useState } from "react"
import { View, Text } from "react-native"

export default function Hub() {
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [startDay, setStartDay] = useState<number | undefined>(undefined)
    const [endDay, setEndDay] = useState<number | undefined>(undefined)

    const logCurrentUser = async () => {
        const currentUser = await fetchCurrentUser()
        console.log('current user: ', currentUser)
    }

    const storeCurrentUserTrip = async () => {
        try {
            const currentUserTrip = await fetchCurrentUserTrip()
            const startDate = new Date(currentUserTrip.startDate)
            const endDate = new Date(currentUserTrip.endDate)
            const startDay = startDate.getDate()
            const endDay = endDate.getDate()
            setStartDate(startDate)
            setEndDate(endDate)
            setStartDay(startDay)
            setEndDay(endDay)
        }
        catch (err) {
            console.error('Error storing current trip data: ', err)
        }
    }

    useEffect(() => {
        storeCurrentUserTrip()
    }, [])

    // logCurrentUser()

    useEffect(() => {
        console.log('start date: ', startDate)
        console.log('end date: ', endDate)
        console.log('start day: ', startDay)
        console.log('end day: ', endDay)
    }, [startDate, endDate, startDay, endDay])

    return (
        <View>
            <Text>This is the hub page.</Text>
        </View>
    )
}