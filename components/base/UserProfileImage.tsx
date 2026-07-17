import { useEffect, useState } from 'react'
import { View, Image, StyleSheet, ViewStyle } from 'react-native'

interface UserProfileImageProps {
    pic?: string
    size: number
    style?: ViewStyle
}

export default function UserProfileImage({ pic, size, style }: UserProfileImageProps) {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
    }, [])

    const imageStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
    }

    return (
        <View style={[imageStyle, style]}>
            {isLoading && (
                <View style={[imageStyle, styles.skeleton]} />
            )}
            <Image
                source={
                    pic
                        ? { uri: pic }
                        : require('../../assets/img/placeholder-profile2.webp')
                }
                style={imageStyle}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    skeleton: {
        position: 'absolute',
        backgroundColor: '#e0e0e0',
        zIndex: 1,
    },
})
