import { useState } from "react"
import { View } from "react-native"
import Table from "./Table"

export default function Hub() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [displayMonth, setDisplayMonth] = useState(monthNames[2])
    const [displayYear, setDisplayYear] = useState(new Date().getFullYear())

    return (
        <View>
            <Table />
        </View>
    )
}