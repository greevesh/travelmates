import { View, StyleSheet } from "react-native"
import ForgotPasswordCard from "@/components/auth/forgot-password/Card"

export default function Page() {
    return (
        <View style={styles.container}>
            <ForgotPasswordCard />
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