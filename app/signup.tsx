import { View, StyleSheet } from "react-native"
import SignUpCard from "@/components/auth/sign-up/Card"
import { LinearGradient } from 'expo-linear-gradient'

export default function Page() {
    return (
        <LinearGradient colors={['#3b5998', '#8b9dc3']}>
            <View style={styles.container}>
                <SignUpCard />
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