import { StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'

const BLUE = '#3a9fff'
const LIGHT_BLUE = '#e8f4fc'

export default function NotificationsEmptyState() {
    return (
        <View style={styles.container}>
            <View style={styles.illustration}>
                <View style={styles.circle}>
                    <Icon source="bell-outline" size={56} color={BLUE} />
                </View>
            </View>
            <Text style={styles.headline}>You&apos;re all caught up!</Text>
            <Text style={styles.subtext}>
                When something important happens, you&apos;ll see it here.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 16,
        paddingBottom: 20,
        gap: 14,
    },
    illustration: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    circle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: LIGHT_BLUE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headline: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center',
    },
    subtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
})
