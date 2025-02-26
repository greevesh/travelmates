import { View, StyleSheet } from "react-native"
import ForgotPasswordCard from "@/components/auth/forgot-password/Card"
import { LinearGradient } from "expo-linear-gradient"

export default function Page() {
    return (
        <LinearGradient colors={['#3b5998', '#8b9dc3']}>
            <View style={styles.container}>
                <ForgotPasswordCard />
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