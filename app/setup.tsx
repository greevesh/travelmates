import { StyleSheet, View } from "react-native"
import SetupCard from "@/components/setup/Card"

export default function Page() {
    return (
        <View style={styles.container}>
            <SetupCard />
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
})