import { View, StyleSheet } from "react-native"
import SignUpCard from "@/components/auth/sign-up/Card"

export default function Page() {
    return (
        <View style={styles.container}>
            <SignUpCard />
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