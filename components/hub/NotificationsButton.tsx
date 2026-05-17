import { StyleSheet } from 'react-native'
import { IconButton, Text, Badge } from 'react-native-paper'
import { useEffect, useState } from 'react'
import React from 'react'
import WithModal from '../hoc/WithModal'
import { friendRequestsEndpoint } from '@/consts/api'
import { fetchUserCredentials, withAuthRetry } from '@/utils/auth'
import axios from 'axios'
import fetchCurrentUser from '@/utils/fetchCurrentUser'
import FriendRequestCard from './FriendRequestCard'
import { handleError } from '@/utils/errorHandler'

interface Notification {
  _id: string;
  senderUsername: string;
  senderPic: string;
}

export default function NotificationsModal() {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [count, setCount] = useState(0)
    const [notifications, setNotifications] = useState<Notification[]>([])

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

    const handlePostData = async () => {
		setLoading(true)
        const { username, accessToken } = await fetchUserCredentials()
		try {
            const user = { 
				username, 
				accessToken 
			}
			const res = await withAuthRetry((headers) => axios.post(friendRequestsEndpoint, { user }, { headers }))
			if (__DEV__) console.log('data: ', res.data)
			return res.data
		}
		catch (err) {
			
		}
		finally {
			setLoading(false)
		}
	}

    const handleAccept = async (requestId: string) => {
        try {
            await withAuthRetry((headers) => axios.patch(
                friendRequestsEndpoint + requestId,
                { status: 'accepted' },
                { headers }
            ))
            // setNotifications(notifications.filter((notification) => notification._id !== requestId))
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
            // setNotifications(notifications.filter((notification) => notification._id !== requestId))
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
                <Text style={styles.title}>Notifications</Text>
                {notifications.map((notification) => (
                    <FriendRequestCard pic={notification.senderPic} username={notification.senderUsername} onAccept={() => handleAccept(notification._id)} onReject={() => handleReject(notification._id)} key={notification._id} request={notification} />
                ))}
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
        height: 300,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center',
        color: '#000',
    },
}) 