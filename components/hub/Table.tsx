import fetchCurrentUserTrip from "@/utils/fetchCurrentUserTrip"
import { useEffect, useState } from "react"
import { DataTable, IconButton } from 'react-native-paper'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import React from "react"
import ProfilePhoto from "../edit/ProfilePhoto"
import { useCurrentUserStore } from "@/stores/useProfilePhotoStore"

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

    const [trip, setTrip] = useState<TableTrip>({ location: '', startDay: undefined, endDay: undefined })
    
    const username = useCurrentUserStore((state) => state.username)

    const parseTrip = (trip: RawTrip) => {
        const { startDate, endDate, location } = trip
        let startDay = startDate.getDate()
        let endDay = endDate.getDate()
        let fullMonth = false

        console.log('end date: ', displayYear < endDate.getFullYear())

        const isStartInCurrentMonth = startDate.getMonth() === month && startDate.getFullYear() === displayYear
        const isEndInCurrentMonth = endDate.getMonth() === month && endDate.getFullYear() === displayYear
        const betweenMonths = month > startDate.getMonth() && month < endDate.getMonth()
        const moreThanOneYear = displayYear < endDate.getFullYear() || displayYear === endDate.getFullYear() && month < endDate.getMonth()

        if (isStartInCurrentMonth && !isEndInCurrentMonth) {
            endDay = monthDaysLength
        }
        else if (betweenMonths || moreThanOneYear) {
            startDay = 1
            endDay = monthDaysLength
            fullMonth = true
        }
        // If doesn't start in current month but ends in current month
        else if (!isStartInCurrentMonth) {
            startDay = 1
        }

        if (isStartInCurrentMonth || isEndInCurrentMonth || fullMonth) {
            setTrip({ location, startDay, endDay })
        }
        else {
            setTrip({ location: '', startDay: undefined, endDay: undefined })
        }
    }
    
    const loadCurrentUserTrip = async () => {
        try {
            const currentUserTrip = await fetchCurrentUserTrip()
            const startDate = new Date(currentUserTrip.startDate)
            const endDate = new Date(currentUserTrip.endDate)
            const { location } = await fetchCurrentUserTrip()
            parseTrip({ startDate, endDate, location })
            // console.log('trip: ', { location, startDate, endDate, startDay, endDay })
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
        loadCurrentUserTrip()
        console.log('month: ', month)
    }, [month])

    useEffect(() => {
        loadDisplayDays()
        console.log('trip: ', trip)
    }, [monthDaysLength, trip])

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
                            {displayDays && displayDays.map((day) => (
                                <React.Fragment key={day}>
                                    {trip.startDay && day >= trip.startDay && trip.endDay && day <= trip.endDay ? (
                                        <View style={{ backgroundColor: 'lightblue', width: 30 }}>
                                            {trip.startDay === day && (
                                                <Text>{trip.location}</Text>
                                            )}
                                        </View>
                                    ) : (
                                        <View style={{ width: 30 }}>
                                            <Text></Text>
                                        </View>
                                    )}
                                </React.Fragment>
                            ))}
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