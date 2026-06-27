import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { Icon } from 'react-native-paper'
import Svg, { Path } from 'react-native-svg'

const FLIGHT_WIDTH = 280
const FLIGHT_HEIGHT = 110

const FLIGHT_PATH =
    'M 12 72 L 62 72 C 62 72 62 36 98 36 C 134 36 134 72 98 72 C 62 72 62 108 98 108 C 134 108 168 82 206 54 C 244 26 262 14 272 6'

type SplashScreenProps = {
    fontsLoaded?: boolean
}

const WAVE_HEIGHT = 6
const WAVE_DURATION = 400
const WAVE_STAGGER = 200

function WaveDots() {
    const dot1 = useRef(new Animated.Value(0)).current
    const dot2 = useRef(new Animated.Value(0)).current
    const dot3 = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const bounce = (value: Animated.Value) =>
            Animated.sequence([
                Animated.timing(value, {
                    toValue: -WAVE_HEIGHT,
                    duration: WAVE_DURATION,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(value, {
                    toValue: 0,
                    duration: WAVE_DURATION,
                    easing: Easing.in(Easing.quad),
                    useNativeDriver: true,
                }),
            ])

        const animation = Animated.loop(
            Animated.stagger(WAVE_STAGGER, [bounce(dot1), bounce(dot2), bounce(dot3)]),
        )

        animation.start()
        return () => animation.stop()
    }, [dot1, dot2, dot3])

    return (
        <View style={styles.dots}>
            {[dot1, dot2, dot3].map((translateY, index) => (
                <Animated.View
                    key={index}
                    style={[styles.dot, { transform: [{ translateY }] }]}
                />
            ))}
        </View>
    )
}

function FlightPathAndPlane() {
    return (
        <View style={styles.flightArea}>
            <Svg width={FLIGHT_WIDTH} height={FLIGHT_HEIGHT} viewBox={`0 0 ${FLIGHT_WIDTH} ${FLIGHT_HEIGHT}`}>
                <Path
                    d={FLIGHT_PATH}
                    stroke="rgba(255, 255, 255, 0.92)"
                    strokeWidth={2}
                    strokeDasharray="5 6"
                    strokeLinecap="round"
                    fill="none"
                />
            </Svg>
            <View style={styles.plane}>
                <Icon source="airplane" size={38} color="#ffffff" />
            </View>
        </View>
    )
}

export default function SplashScreen({ fontsLoaded = false }: SplashScreenProps) {
    return (
        <LinearGradient colors={['#3d7fd6', '#1f4fa8', '#173f8f']} style={styles.container}>
            <StatusBar style="light" />

            <View style={styles.flightTop}>
                <FlightPathAndPlane />
            </View>

            <View style={styles.textBlock}>
                <Text style={[styles.title, fontsLoaded && styles.titleFont]}>TravelM@tes</Text>
                <WaveDots />
                <Text style={[styles.tagline, fontsLoaded && styles.taglineFont]}>
                    See where your friends are going.
                </Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flightTop: {
        position: 'absolute',
        top: 72,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    textBlock: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        gap: 22,
    },
    flightArea: {
        width: FLIGHT_WIDTH,
        height: FLIGHT_HEIGHT + 10,
        paddingTop: 10,
        position: 'relative',
    },
    plane: {
        position: 'absolute',
        right: 0,
        top: 6,
        transform: [{ rotate: '12deg' }],
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: 0.5,
    },
    titleFont: {
        fontFamily: 'Poppins_600SemiBold',
        fontWeight: '400',
    },
    dots: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
        height: 14,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: '#ffffff',
    },
    tagline: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.92)',
    },
    taglineFont: {
        fontFamily: 'Poppins_400Regular',
    },
})
