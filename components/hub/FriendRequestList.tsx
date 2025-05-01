import { StyleSheet, View, FlatList } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { Friendship } from '@/stores/useFriendshipStore'
import FriendRequestCard from './FriendRequestCard'

interface FriendRequestListProps {
    requests: Friendship[]
    onAccept: (requestId: number) => void
    onReject: (requestId: number) => void
}

export default function FriendRequestList({ requests, onAccept, onReject }: FriendRequestListProps) {
    if (requests.length === 0) {
        return (
            <Card style={styles.emptyCard}>
                <Text style={styles.emptyText}>No pending friend requests</Text>
            </Card>
        )
    }

    return (
        <FlatList
            data={requests}
            keyExtractor={(item) => item.recipientId.toString()}
            renderItem={({ item }) => (
                <FriendRequestCard
                    request={item}
                    onAccept={onAccept}
                    onReject={onReject}
                />
            )}
            contentContainerStyle={styles.listContainer}
        />
    )
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
    emptyCard: {
        margin: 16,
        padding: 16,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
}) 