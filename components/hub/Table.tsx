import React, { useEffect, useState } from "react"
import { DataTable, IconButton } from 'react-native-paper'
import { ScrollView, View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import fetchCurrentUser from "@/utils/fetchCurrentUser"
import { friendsEndpoint } from "@/consts/api"
import { withAuthRetry } from "@/utils/auth"
import axios from "axios"
import { handleError } from "@/utils/errorHandler"
import { useTableStore } from "@/stores/useTableStore"
import fetchTrips from "@/utils/fetchTrips"
import { widthsByDaySpan, DAY_CELL_WIDTH } from "@/consts/table"
import TableLoadError from "./TableLoadError"

type RowsLoadState = 'loading' | 'error' | 'success'

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
    const [rowsLoadState, setRowsLoadState] = useState<RowsLoadState>('loading')
    const [tableHeight, setTableHeight] = useState<number>(50)

    const HEADER_HEIGHT = 50
    const ROW_HEIGHT = 50
    const MAX_VISIBLE_ROWS = 5

    const tableWidth = monthDaysLength === 31 ? 1766 : 1716

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

    const getTripDays = (day: number) => {
        const filteredTrips = trips.filter(trip => 
            trip.startDay && trip.endDay && 
            day >= trip.startDay && 
            day <= trip.endDay
        )
        return filteredTrips
    }

    useEffect(() => {
        loadTrips()
        if (__DEV__) console.log('month: ', month)
    }, [month])

    useEffect(() => {
        loadDisplayDays()
        if (__DEV__) console.log('trips: ', trips)
    }, [monthDaysLength, trips])

    useEffect(() => {
        setTableHeight(HEADER_HEIGHT + ROW_HEIGHT * visibleRows)
      }, [rows.length])

    const showTable = rowsLoadState === 'success' && rows.length > 0

    const loadRows = async () => {
        try {
            setRowsLoadState('loading')
            const user = await fetchCurrentUser()
            if (!user?._id) {
                throw new Error('Failed to load current user')
            }
            const { _id, username, pic } = user
            const res = await withAuthRetry((headers) => axios.get(friendsEndpoint, { headers }))
            const friends = Array.isArray(res.data) ? res.data : []
            setRows([{ _id, username, pic }, ...friends])
            setRowsLoadState('success')
        }
        catch (err) {
            handleError(err, 'Failed to load users')
            setRows([])
            setRowsLoadState('error')
        }
    }

    useEffect(() => {
        loadRows()
    }, [])

    const getTripWidthInMonth = (trip: TableTrip) => {
        if (!trip.startDay || !trip.endDay) return 0
        const daysInMonth = trip.endDay - trip.startDay + 1
        return widthsByDaySpan[daysInMonth] ?? daysInMonth * DAY_CELL_WIDTH
    }

    return (
        <>
            {rowsLoadState === 'loading' ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3a9fff" />
                </View>
            ) : showTable ? (
                <View style={styles.tableSection}>
                <View style={{ maxHeight: tableHeight, backgroundColor: '#ffffff' }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <DataTable style={{ width: tableWidth }}>
                            <DataTable.Header style={styles.headerRow}>
                                <View style={styles.userTxt}>
                                    <Text style={styles.headerText}>User</Text>
                                </View>
                                {displayDays && displayDays.map((day) => (
                                    <View style={styles.day} key={day}>
                                        <Text style={styles.headerText}>{day}</Text>
                                    </View>
                                ))}
                            </DataTable.Header>
                            <ScrollView
                                style={{ maxHeight: tableHeight }}
                                nestedScrollEnabled
                                showsVerticalScrollIndicator={false}
                            >
                                {rows.map((row) => (
                                    <DataTable.Row key={row._id} style={styles.dataRow}>
                                        <View style={styles.userCell}>
                                        <Image 
                                            source={
                                                row.pic
                                                    ? { uri: row.pic }
                                                    : require('../../assets/img/placeholder-profile2.webp')
                                            }
                                            style={styles.userPic} 
                                        />
                                            <Text style={styles.username}>{row.username}</Text>
                                        </View>
                                        {displayDays && displayDays.map((day) => {
                                        const dayTrips = getTripDays(day)
                                        return (
                                            <View
                                                key={`${row._id}-${day}`}
                                                style={styles.dayCell}
                                            >
                                                {dayTrips.map((trip) => (
                                                    row._id === trip.userId &&
                                                    trip.startDay === day && (
                                                        <View key={`${trip.startDay}-${trip.userId}`} style={[styles.locationContainer, styles.tripBar, { width: getTripWidthInMonth(trip) }]}>
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
                <Text style={styles.monthLabel}>{displayMonth} {displayYear}</Text>
                <View style={styles.chevronBtns}>
                    <IconButton size={30} disabled={previousBtnDisabled} onPress={decrementMonth} icon="chevron-left" />
                    <IconButton size={30} disabled={nextBtnDisabled} onPress={incrementMonth} icon="chevron-right" />
                </View>
            </View>
                </View>
            ) : (
                <TableLoadError onRetry={loadRows} />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    headerRow: {
        backgroundColor: '#f7f9fc',
    },
    headerText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1f2937',
    },
    userPic: {
        width: 34,
		height: 34,
		borderRadius: 17,
    },
    userTxt: {
        justifyContent: 'center', 
        width: 120, 
        height: 50,
        marginRight: 40,
    },
    day: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: DAY_CELL_WIDTH,
        borderLeftWidth: 1,
        borderLeftColor: '#e5e7eb',
    },
    dataRow: {
        height: 56,
    },
    dayCell: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 56,
        width: DAY_CELL_WIDTH,
        borderLeftWidth: 1,
        borderLeftColor: '#eceff4',
        overflow: 'visible',
        left: 1
    },
    userCell: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginTop: 3,
    },
    username: {
        marginTop: 0,
        marginLeft: 10,
        width: 115
    },
    locationContainer: {
        backgroundColor: '#98ea93',
        borderColor: '#6cd16c',
        borderWidth: 1,
        height: 34,
        borderRadius: 10,
        justifyContent: 'center',
    },
    tripBar: {
        position: 'absolute',
        left: -1,
        top: 11,
        zIndex: 10,
    },
    locationText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#1f2937',
        width: 400,
        zIndex: 50,
    },
    tableSection: {
        width: '100%',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    belowTableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 12,
        marginTop: 8,
    },
    monthLabel: {
        margin: 6,
        fontSize: 37 - 17,
        fontWeight: '600',
        color: '#183a75',
    },
    chevronBtns: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
})