import { View, StyleSheet } from "react-native";
import Hub from "@/components/hub/Hub";

export default function Page() {
    return (
        <View style={styles.container}>
            <Hub />
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