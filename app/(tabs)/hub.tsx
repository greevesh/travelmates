import { View, StyleSheet } from "react-native"
import Hub from "@/components/hub/Hub"
import { LinearGradient } from "expo-linear-gradient"

export default function Page() {
    return (
        <LinearGradient style={styles.gradient} colors={['#8ec5fc', '#5f93d3']}>
            <View style={styles.container}>
                <Hub />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})