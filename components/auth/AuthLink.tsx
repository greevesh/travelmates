import { Pressable, StyleSheet, Text } from 'react-native'
import { Link, type RelativePathString } from 'expo-router'

interface IAuthLinkProps {
    text: string
    path: RelativePathString
}

export default function AuthLink({ path, text }: IAuthLinkProps) {
    return (
        <Link style={{ marginTop: 10 }} push href={path} asChild>
            <Pressable
                style={styles.pressable}
                android_ripple={{ color: 'transparent' }}
            >
                <Text style={styles.link}>{text}</Text>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    pressable: {
        backgroundColor: 'transparent',
    },
    link: {
        textAlign: 'center',
        color: '#006994',
    },
})