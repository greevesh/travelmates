import { StyleSheet, View } from "react-native"
import SetupCard from "@/components/setup/Card"
import { LinearGradient } from 'expo-linear-gradient'

export default function Page() {
    return (
        <LinearGradient colors={['#3b5998', '#8b9dc3']}>
            <View style={styles.container}>
                <SetupCard />
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