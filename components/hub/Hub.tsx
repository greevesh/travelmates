import { View, StyleSheet } from "react-native"
import Table from "./Table"

export default function Hub() {
    return (
        <View style={styles.container}>
            <Table />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
})