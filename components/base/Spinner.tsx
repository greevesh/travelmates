import { StyleSheet } from "react-native"
import { ActivityIndicator } from "react-native-paper"

export default function Spinner() {
    return (
        <ActivityIndicator style={styles.spinner} color="#fff" size={20} />
    )
}

const styles = StyleSheet.create({
    spinner: {
        position: 'absolute',
        right: 20
    }
})