import { StyleSheet } from 'react-native'
import { Link, type RelativePathString } from 'expo-router'

interface IAuthLinkProps {
    text: string
    path: RelativePathString
}

export default function AuthLink({ path, text }: IAuthLinkProps) {
    return (
        <Link push href={path} style={styles.link}>{text}</Link>
    )
}

const styles = StyleSheet.create({
    link: {
        textAlign: 'center',
        color: '#006994',
    }
})