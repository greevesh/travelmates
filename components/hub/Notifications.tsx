import { ScrollView, StyleSheet, View } from 'react-native'
import { IconButton, Text, Badge } from 'react-native-paper'
import { useEffect, useState } from 'react'
import React from 'react'
import WithModal from '../hoc/WithModal'
import { friendRequestsEndpoint, usersEndpoint } from '@/consts/api'
import { withAuthRetry } from '@/utils/auth'
import axios from 'axios'
import fetchCurrentUser from '@/utils/fetchCurrentUser'
import FriendRequestCard from './FriendRequestCard'
import NotificationsEmptyState from './NotificationsEmptyState'
import { handleError } from '@/utils/errorHandler'
import { useTableStore } from '@/stores/useTableStore'
import PlaneIcon from '../base/PlaneIcon'

interface Notification {
  _id: string
  senderId: string
  senderUsername: string
  senderPic: string
}

export default function NotificationsModal() {
    const [visible, setVisible] = useState(false)

    const [count, setCount] = useState(0)
    const [notifications, setNotifications] = useState<Notification[]>([])

    const addRow = useTableStore((state) => state.addRow)

    async function fetchFriendReqs() {
        try {
            const { _id } = await fetchCurrentUser()
            const res = await withAuthRetry((headers) => axios.get(friendRequestsEndpoint, {
                headers,
                params: {
                    status: 'pending',
                    recipientId: _id,
                    requestType: 'incoming'
                }
            }))
            const friendReqs = await res.data.pendingFriendRequests
            if (__DEV__) console.log('friend reqs: ', friendReqs)
            setCount(friendReqs.length)
            setNotifications(friendReqs)
        }
        catch(err) {
            handleError(err, 'Failed to fetch friend requests')
            throw err
        }
    }

    const handleAccept = async (requestId: string) => {
        try {
            await withAuthRetry((headers) => axios.patch(
                friendRequestsEndpoint + requestId,
                { status: 'accepted' },
                { headers }
            ))
            setNotifications(notifications.filter((notification) => notification._id !== requestId))
            const newFriend = notifications.find((n) => n._id === requestId)
            if (!newFriend) return

            const res = await withAuthRetry((headers) => axios.get(usersEndpoint + newFriend.senderUsername, { headers }))
            const { _id, username, pic } = res.data[0]
            newFriend && addRow({ _id, username, pic })
            setCount(count - 1)
        }
        catch(err) {
            handleError(err, 'Failed to accept the friend request')
            throw err
        }
    }

    const handleReject = async (requestId: string) => {
        try {
            await withAuthRetry((headers) => axios.patch(
                friendRequestsEndpoint + requestId,
                { status: 'rejected' },
                { headers }
            ))
            setNotifications(notifications.filter((notification) => notification._id !== requestId))
        }
        catch(err) {
            handleError(err, 'Failed to reject the friend request')
            throw err
        }
    }

    useEffect(() => {
        fetchFriendReqs()
    }, [])

    useEffect(() => {
        if (__DEV__) console.log('notifications: ', notifications)
    }, [notifications])

    return (
        <>
            <IconButton
                icon="bell"
                size={28}
                iconColor="#183a75"
                onPress={() => setVisible(true)}
            />
            {count > 0 && (
                <Badge
                    size={20}
                    style={styles.badge}
                >
                    {count}
                </Badge>
            )}
            <WithModal
                style={styles.modal}
                visible={visible}
				onClose={() => setVisible(false)}
            >
                <PlaneIcon style={{ top: 10, left: 10 }} />
                <Text style={styles.title}>Notifications</Text>
                {notifications.length === 0 ? (
                    <NotificationsEmptyState />
                ) : (
                    <ScrollView
                        style={styles.notificationsScroll}
                        contentContainerStyle={styles.notificationsList}
                        nestedScrollEnabled
                    >
                        {notifications.map((notification, index) => (
                            <FriendRequestCard
                                pic={notification.senderPic}
                                username={notification.senderUsername}
                                onAccept={() => handleAccept(notification._id)}
                                onReject={() => handleReject(notification._id)}
                                isLast={index === notifications.length - 1}
                                key={notification._id}
                            />
                        ))}
                    </ScrollView>
                )}
            </WithModal>
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginTop: 4,
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: 11,
        backgroundColor: '#FF3B30',
    },
    modal: {
        width: '90%',
        minHeight: 380,
    },
    planeContainer: {
        position: 'absolute', 
        top: 10, 
        left: 10
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center',
        color: '#000',
    },
    notificationsScroll: {
        maxHeight: 320,
        width: '100%',
    },
    notificationsList: {
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
}) 