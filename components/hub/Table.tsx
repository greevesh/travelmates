import React, { useEffect, useState } from "react"
import { DataTable, IconButton } from 'react-native-paper'
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native'
import fetchCurrentUser from "@/utils/fetchCurrentUser"
import { friendRequestsEndpoint } from "@/consts/api"
import { withAuthRetry } from "@/utils/auth"
import axios from "axios"
import { handleError } from "@/utils/errorHandler"
import { Friend, useTableStore } from "@/stores/useTableStore"
import fetchTrips from "@/utils/fetchTrips"
import { widthsByDaySpan, DAY_CELL_WIDTH, marginsByDays } from "@/consts/table"

interface TableTrip {
    location: string
    startDay: number | undefined
    endDay: number | undefined
    userId: string
}

interface RawTrip {
    startDate: Date
    endDate: Date
    location: string
    userId: string
}

export default function Table() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [month, setMonth] = useState(new Date().getMonth())
    const [displayMonth, setDisplayMonth] = useState(monthNames[month])
    const [displayYear, setDisplayYear] = useState(new Date().getFullYear())
    const [monthDaysLength, setMonthDaysLength] = useState(new Date(displayYear, month + 1, 0).getDate())
    const [displayDays, setDisplayDays] = useState<number[] | undefined>(undefined)

    const [trips, setTrips] = useState<TableTrip[]>([])
    
    const rows = useTableStore((state) => state.rows)
    const setRows = useTableStore((state) => state.setRows)
    const [tableHeight, setTableHeight] = useState<number>(50)

    const HEADER_HEIGHT = 50
    const ROW_HEIGHT = 50
    const MAX_VISIBLE_ROWS = 7

    const visibleRows = Math.min(rows.length, MAX_VISIBLE_ROWS)

    /**
     * Parses a trip into a format suitable for display in the monthly calendar
     * Handles cases where:
     * - Trip starts in current month
     * - Trip ends in current month
     * - Trip spans multiple months
     * - Trip spans multiple years
    */
    
    const parseTrip = (trip: RawTrip): TableTrip | null => {
        const { startDate, endDate, location, userId } = trip
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
            return { location, startDay, endDay, userId }
        }
        return null
    }
    
    const loadTrips = async () => {
        try {
            const rawTrips = await fetchTrips()
            const newTrips: TableTrip[] = []
            
            rawTrips.forEach((trip: any) => {
                const startDate = new Date(trip.startDate)
                const endDate = new Date(trip.endDate)
                const { location, userId } = trip
                const parsedTrip = parseTrip({ startDate, endDate, location, userId })
                parsedTrip && newTrips.push(parsedTrip)
            })
            setTrips(newTrips)
            if (__DEV__) console.log('trips loaded: ', newTrips)
        }
        catch (err) {
            if (__DEV__) console.error('Error storing current trip data: ', err)
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
        loadTrips()
        if (__DEV__) console.log('month: ', month)
    }, [month])

    useEffect(() => {
        loadDisplayDays()
        if (__DEV__) console.log('trips: ', trips)
    }, [monthDaysLength, trips])

    const getTripDays = (day: number) => {
        const filteredTrips = trips.filter(trip => 
            trip.startDay && trip.endDay && 
            day >= trip.startDay && 
            day <= trip.endDay
        )
        return filteredTrips
    }

    const fetchFriends = async () => {
        try {
            const { _id } = await fetchCurrentUser()
            const res = await withAuthRetry((headers) => axios.get(friendRequestsEndpoint, {
                headers,
                params: {
                    status: 'accepted',
                    recipientId: _id,
            }
        }))
        const currentUser = rows[0]
        const fetchedFriends = await res.data.friends
        const filteredFriends: Friend[] = []
        fetchedFriends && fetchedFriends.map((friend: Friend) => {
            const { senderId, senderPic, senderUsername } = friend
            filteredFriends.push({senderId, senderPic, senderUsername})
        })
        setRows([currentUser, ...filteredFriends])
        }
        catch (err) {
            handleError(err, 'Failed to fetch friends')
            throw err
        }
    }

    useEffect(() => {
        setTableHeight(HEADER_HEIGHT + ROW_HEIGHT * visibleRows)
      }, [rows.length])

    useEffect(() => {
        fetchFriends()
    }, [])

    const getTripWidthInMonth = (trip: TableTrip) => {
        if (!trip.startDay || !trip.endDay) return 0
        const daysInMonth = trip.endDay - trip.startDay + 1
        return widthsByDaySpan[daysInMonth] ?? daysInMonth * DAY_CELL_WIDTH
    }

    return (
        <>
            <View style={{ maxHeight: tableHeight, backgroundColor: '#fff' }}>
                <ScrollView horizontal={true}>
                    <DataTable style={{ width: 1716 }}>
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
                        <ScrollView
                            style={{ maxHeight: tableHeight }}
                            nestedScrollEnabled
                        >
                            {rows.map((row) => (
                                <DataTable.Row key={row.senderId}>
                                    <View style={{ flexDirection: 'row', marginTop: 14 }}>
                                    <Image 
                                        source={
                                            row.senderPic
                                                ? { uri: row.senderPic }
                                                : require('../../assets/img/placeholder-profile2.webp')
                                        }
                                        style={styles.userPic} 
                                    />
                                        <Text style={styles.username}>{row.senderUsername}</Text>
                                    </View>
                                    {displayDays && displayDays.map((day) => {
                                    const dayTrips = getTripDays(day)
                                    return (
                                        <View
                                            key={`${row.senderId}-${day}`}
                                            style={{ justifyContent: 'center', height: 50 }}
                                        >
                                            {dayTrips.map((trip) => (
                                                row.senderId === trip.userId &&
                                                trip.startDay === day && (
                                                    <View key={`${trip.startDay}-${trip.userId}`} style={[styles.locationContainer, { width: getTripWidthInMonth(trip) + 5, marginLeft: marginsByDays[day] }]}>
                                                        <Text style={styles.locationText}>{trip.location}</Text>
                                                    </View>
                                                )
                                            ))}
                                        </View>
                                    )
                                })}
                            </DataTable.Row>
                            ))}
                    </ScrollView>
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
    userPic: {
        width: 25,
		height: 25,
		borderRadius: 25,
    },
    userTxt: {
        justifyContent: 'center', 
        width: 100, 
        height: 50,
        marginRight: 50
    },
    day: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 50,
    },
    username: {
        marginTop: 3, 
        marginLeft: 7,
        width: 115
    },
    locationContainer: {
        backgroundColor: 'lightgreen',  
        height: 35, 
        borderRadius: 6, 
        justifyContent: 'center'
    },
    locationText: {
        marginLeft: 5, 
        fontSize: 14, 
        width: 400, 
        zIndex: 50,
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