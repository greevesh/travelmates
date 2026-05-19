import { View, StyleSheet } from "react-native"
import Hub from "@/components/hub/Hub"
import { LinearGradient } from "expo-linear-gradient"

export default function Page() {
    return (
        <LinearGradient colors={['#8ec5fc', '#5f93d3']}>
            <View style={styles.container}>
                <Hub />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
})