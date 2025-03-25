import { View, Text, StyleSheet } from "react-native"

export default function Trips() {
    return (
        <View style={styles.container}>
            <Text>Trips</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center'
    }
})