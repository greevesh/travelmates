import { StyleSheet, View } from 'react-native'
import { Button, Icon, Text } from 'react-native-paper'

const BLUE = '#3a9fff'
const LIGHT_BLUE = '#e8f4fc'

function LoadErrorIllustration() {
    return (
        <View style={styles.illustration}>
            <View style={styles.circle}>
                <Icon source="table-off" size={56} color={BLUE} />
            </View>
        </View>
    )
}

type TableLoadErrorProps = {
    onRetry: () => void
}

export default function TableLoadError({ onRetry }: TableLoadErrorProps) {
    return (
        <View style={styles.container}>
            <LoadErrorIllustration />
            <Text style={styles.headline}>We couldn&apos;t load your table</Text>
            <Text style={styles.subtext}>
                Something went wrong while loading the table. Please check your connection and try again.
            </Text>
            <Button
                mode="contained"
                onPress={onRetry}
                buttonColor={BLUE}
                textColor="#ffffff"
                style={styles.button}
                labelStyle={styles.buttonLabel}
            >
                Try Again
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 28,
        paddingVertical: 32,
        backgroundColor: '#ffffff',
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
    button: {
        marginTop: 6,
        borderRadius: 10,
    },
    buttonLabel: {
        fontSize: 15,
        fontWeight: '600',
    },
})
