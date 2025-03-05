import fetchCurrentUserTrip from "@/utils/fetchCurrentUserTrip"
import { useEffect, useState } from "react"
import { DataTable, IconButton } from 'react-native-paper'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import React from "react"

export default function Table() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [month, setMonth] = useState(new Date().getMonth())
    const [displayMonth, setDisplayMonth] = useState(monthNames[month])
    const [displayYear, setDisplayYear] = useState(new Date().getFullYear())
    const [monthDaysLength, setMonthDaysLength] = useState(new Date(displayYear, month + 1, 0).getDate())
    const [displayDays, setDisplayDays] = useState<number[] | undefined>(undefined)
    
    const parseAndLogCurrentUserTrip = async () => {
        try {
            const currentUserTrip = await fetchCurrentUserTrip()
            const location = currentUserTrip.location
            const startDate = new Date(currentUserTrip.startDate)
            const endDate = new Date(currentUserTrip.endDate)
            const startDay = startDate.getDate()
            const endDay = endDate.getDate()
            console.log('trip: ', { location, startDate, endDate, startDay, endDay })
        }
        catch (err) {
            console.error('Error storing current trip data: ', err)
        }
    }

    const loadDisplayDays = () => {
        let days = []
        let startDay
        if (month === new Date().getMonth() && displayYear === new Date().getFullYear()) {
            startDay = new Date().getDate()
        }
        else {
            startDay = 1
        }
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
        parseAndLogCurrentUserTrip()
    }, [])

    useEffect(() => {
        loadDisplayDays()
    }, [monthDaysLength])

    // logCurrentUser()

    return (
        <>
            <View style={{ height: 100, backgroundColor: '#fff' }}>
                <ScrollView horizontal={true}>
                    <DataTable style={{ width: 1100 }}>
                        <DataTable.Header>
                            <DataTable.Title style={{ flex: 3 }}>User</DataTable.Title>
                            {displayDays && displayDays.map((day) => (
                                <DataTable.Title key={day}>{day}</DataTable.Title>
                            ))}
                        </DataTable.Header>
                    </DataTable>
                </ScrollView>
            </View>
            <View style={styles.belowTableContainer}>
                <Text style={{ margin: 14 }}>{displayMonth} {displayYear}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: -3 }}>
                    <IconButton disabled={previousBtnDisabled} onPress={decrementMonth} icon="chevron-left" />
                    <IconButton disabled={nextBtnDisabled} onPress={incrementMonth} icon="chevron-right" />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    belowTableContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})