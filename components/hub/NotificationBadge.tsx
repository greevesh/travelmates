import { friendshipsEndpoint } from '@/consts/api'
import { fetchUserCredentials } from '@/utils/auth'
import fetchCurrentUser from '@/utils/fetchCurrentUser'
import axios from 'axios'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Badge, IconButton } from 'react-native-paper'

interface NotificationBadgeProps {
    count: number
    onPress: () => void
}

export default function NotificationBadge({ count, onPress }: NotificationBadgeProps) {

    async function fetchFriendReqs() {
        try {
            const { username, refreshToken } = await fetchUserCredentials()
            const { _id } = await fetchCurrentUser()
            const res = await axios.get(friendshipsEndpoint, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`,
                    'X-Username': username || ''
                },
                params: {
                    status: 'pending',
                    recipientId: _id
                }
            },
        )
            console.log('fetched friend reqs: ', res.data)
            return res.data[0]
        }
        catch(err) {
            console.error('Error: Failed to fetch the current user: ', err)
            throw err
        }
    }

    useEffect(() => {
        fetchFriendReqs()
    }, [])

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