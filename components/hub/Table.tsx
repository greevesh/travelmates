import React, { useEffect, useState } from "react"
import { DataTable, IconButton } from 'react-native-paper'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import ProfilePhoto from "../edit/ProfilePhoto"
import { useCurrentUserStore } from "@/stores/useProfilePhotoStore"
import fetchCurrentUserTrips from "@/utils/fetchCurrentUserTrips"

interface TableTrip {
    location: string
    startDay: number | undefined
    endDay: number | undefined
}

interface RawTrip {
    startDate: Date
    endDate: Date
    location: string
}

export default function Table() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [month, setMonth] = useState(new Date().getMonth())
    const [displayMonth, setDisplayMonth] = useState(monthNames[month])
    const [displayYear, setDisplayYear] = useState(new Date().getFullYear())
    const [monthDaysLength, setMonthDaysLength] = useState(new Date(displayYear, month + 1, 0).getDate())
    const [displayDays, setDisplayDays] = useState<number[] | undefined>(undefined)

    const [trips, setTrips] = useState<TableTrip[]>([])
    
    const username = useCurrentUserStore((state) => state.username)

    /**
     * Parses a trip into a format suitable for display in the monthly calendar
     * Handles cases where:
     * - Trip starts in current month
     * - Trip ends in current month
     * - Trip spans multiple months
     * - Trip spans multiple years
    */
    
    const parseTrip = (trip: RawTrip): TableTrip | null => {
        const { startDate, endDate, location } = trip
        let startDay = startDate.getDate()
        let endDay = endDate.getDate()
        let fullMonth = false

        const startsInCurrentMonth = startDate.getMonth() === month && startDate.getFullYear() === displayYear
        const endsInCurrentMonth = endDate.getMonth() === month && endDate.getFullYear() === displayYear
        const sameYear = startDate.getFullYear() === endDate.getFullYear() && startDate.getFullYear() === displayYear
        const spansMonths = month > startDate.getMonth() && month < endDate.getMonth()
        const spansMonthsNotYears = sameYear && spansMonths
        const spansYears = endDate.getFullYear() > startDate.getFullYear()
        const moreThanOneYearAndMonth = spansYears && month > startDate.getMonth() || spansYears && month < endDate.getMonth()

        if (startsInCurrentMonth && !endsInCurrentMonth) {
            endDay = monthDaysLength
        }
        else if (spansMonthsNotYears || moreThanOneYearAndMonth) {
            startDay = 1
            endDay = monthDaysLength
            fullMonth = true
        }
        else if (!startsInCurrentMonth && endsInCurrentMonth) {
            startDay = 1
        }

        if (startsInCurrentMonth || endsInCurrentMonth || fullMonth) {
            return { location, startDay, endDay }
        }
        return null
    }
    
    const loadCurrentUserTrips = async () => {
        try {
            const rawTrips = await fetchCurrentUserTrips()
            const newTrips: TableTrip[] = []
            
            rawTrips.forEach((trip: any) => {
                const startDate = new Date(trip.startDate)
                const endDate = new Date(trip.endDate)
                const { location } = trip
                const parsedTrip = parseTrip({ startDate, endDate, location })
                parsedTrip && newTrips.push(parsedTrip)
            })
            setTrips(newTrips)
            if (__DEV__) console.log('trips loaded: ', newTrips)
        }
        catch (err) {
            console.error('Error storing current trip data: ', err)
        }
    }

    const loadDisplayDays = () => {
        let days = []
        let startDay = 1
        for (let i = startDay; i < monthDaysLength + 1; i++) {
            days.push(i)
        }
        setDisplayDays(days)
    }

    const incrementMonth = () => {
        setMonth(month + 1)
        setDisplayMonth(monthNames[month + 1])
        setMonthDaysLength(new Date(displayYear, month + 2, 0).getDate())
        if (month === 11) {
            setMonth(0)
            setDisplayMonth("January")
            setDisplayYear(displayYear + 1)
        }
    }

    const decrementMonth = () => {
        setMonth(month - 1)
        setDisplayMonth(monthNames[month - 1])
        setMonthDaysLength(new Date(displayYear, month, 0).getDate())
        if (month === 0) {
            setMonth(11)
            setDisplayMonth("December")
            setDisplayYear(displayYear - 1)
        }
    }

    const previousBtnDisabled = month === new Date().getMonth() && displayYear === new Date().getFullYear()
    const nextBtnDisabled = month === new Date().getMonth() && displayYear === new Date().getFullYear() + 3

    useEffect(() => {
        loadCurrentUserTrips()
        if (__DEV__) console.log('month: ', month)
    }, [month])

    useEffect(() => {
        loadDisplayDays()
        if (__DEV__) console.log('trips: ', trips)
    }, [monthDaysLength, trips])

    const getTripDays = (day: number) => {
        return trips.filter(trip => 
            trip.startDay && trip.endDay && 
            day >= trip.startDay && 
            day <= trip.endDay
        )
    }

    return (
        <>
            <View style={{ height: 100, backgroundColor: '#fff' }}>
                <ScrollView horizontal={true}>
                    <DataTable style={{ width: 1100 }}>
                        <DataTable.Header>
                            <View style={styles.userTxt}>
                                <Text>User</Text>
                            </View>
                            {displayDays && displayDays.map((day) => (
                                <View style={styles.day} key={day}>
                                    <Text>{day}</Text>
                                </View>
                            ))}
                        </DataTable.Header>
                        <DataTable.Row>
                            <View style={{ flexDirection: 'row', marginTop: 14 }}>
                                <ProfilePhoto size={25} />
                                <Text style={{ marginTop: 3, marginLeft: 7 }}>{username}</Text>
                            </View>
                            {displayDays && displayDays.map((day) => {
                                const dayTrips = getTripDays(day)
                                return (
                                    <React.Fragment key={day}>
                                        <View style={{ backgroundColor: dayTrips.length > 0 ? 'lightblue' : undefined, width: 30 }}>
                                            {dayTrips.map((trip, index) => (
                                                trip.startDay === day && (
                                                    <Text key={index} style={styles.locationText}>{trip.location}</Text>
                                                )
                                            ))}
                                        </View>
                                    </React.Fragment>
                                )
                            })}
                        </DataTable.Row>
                    </DataTable>
                </ScrollView>
            </View>
            <View style={styles.belowTableContainer}>
                <Text style={{ margin: 14 }}>{displayMonth} {displayYear}</Text>
                <View style={styles.chevronBtns}>
                    <IconButton disabled={previousBtnDisabled} onPress={decrementMonth} icon="chevron-left" />
                    <IconButton disabled={nextBtnDisabled} onPress={incrementMonth} icon="chevron-right" />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    userTxt: {
        justifyContent: 'center', 
        width: 100, 
        height: 50
    },
    day: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 30
    },
    locationText: {
        marginTop: 15, 
        marginLeft: 5, 
        fontSize: 14, 
        width: 400, 
        zIndex: 50 
    },
    belowTableContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chevronBtns: {
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: -3
    }
})