import { StyleSheet, View, Pressable } from 'react-native'
import { Avatar, Button, Text } from 'react-native-paper'
import { Friendship } from '@/stores/useFriendshipStore'

interface FriendRequestCardProps {
    request: Friendship
    onAccept: (requestId: number) => void
    onReject: (requestId: number) => void
}

export default function FriendRequestCard({ request, onAccept, onReject }: FriendRequestCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Avatar.Text 
                    size={40} 
                    label={request.senderId.toString().charAt(0).toUpperCase()} 
                />
                <Text style={styles.username}>User</Text>
            </View>
            <View style={styles.actions}>
                <Button 
                    mode="contained" 
                    onPress={() => onAccept(request.recipientId)}
                    style={styles.acceptButton}
                >
                    Accept
                </Button>
                <Button 
                    mode="outlined" 
                    onPress={() => onReject(request.recipientId)}
                    style={styles.rejectButton}
                >
                    Reject
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        marginLeft: 12,
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    acceptButton: {
        backgroundColor: '#28A745',
    },
    rejectButton: {
        borderColor: '#DC3545',
    },
}) 