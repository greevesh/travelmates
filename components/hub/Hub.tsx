import { View } from "react-native"
import Table from "./Table"

export default function Hub() {
    // Every day from today until three years from today should be assigned a number.
    // Today should be assigned the number '0' then tomorrow '1' then the day after
    // '2' and so on. 365 * 3 = 1095 days. The last available day should be assigned
    // '1095'. So, the loop should terminate at that number. Every time tomorrow comes,
    // the assigned numbers for each day should decrement by 1 (--) and a new day 
    // (the latest day) will inherit the number 1095.

    // for (let i = 0; i < 1096; i++) {
    //     console.log('i: ', i)
    // }

    return (
        <View>
            <Table />
        </View>
    )
}