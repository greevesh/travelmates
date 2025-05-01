import React from 'react'
import { StyleSheet } from 'react-native'
import { Badge, IconButton } from 'react-native-paper'

interface NotificationBadgeProps {
    count: number
    onPress: () => void
}

export default function NotificationBadge({ count, onPress }: NotificationBadgeProps) {
    return (
        <>
            <IconButton
                icon="bell"
                size={28}
                onPress={onPress}
            />
            {count > 0 && (
                <Badge
                    size={20}
                    style={styles.badge}
                >
                    {count}
                </Badge>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'blue'
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: 11,
        backgroundColor: '#FF3B30',
    },
}) 