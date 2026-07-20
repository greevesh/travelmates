import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import UserProfileImage from '@/components/base/UserProfileImage'

interface FriendRequestCardProps {
    pic: string,
    username: string
    onAccept: () => void
    onReject: () => void
    isLast?: boolean
}

export default function FriendRequestCard({ pic, username, onAccept, onReject, isLast = false }: FriendRequestCardProps) {
    return (
        <View style={[styles.container, !isLast && styles.divider]}>
            <View style={styles.userInfo}>
                <UserProfileImage pic={pic} size={50} style={styles.img} />
                <View>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.message}>wants to add you</Text>
                </View>
            </View>
            <View style={styles.actions}>
                <IconButton
                    icon="check"
                    iconColor='#fff' 
                    mode="contained" 
                    onPress={onAccept}
                    style={styles.acceptButton}
                />
                <IconButton 
                    icon="close"
                    mode="outlined" 
                    onPress={onReject}
                    style={styles.rejectButton}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 16,
        width: '94%',
        alignSelf: 'center',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#e8eaed',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 12,
    },
    img: {
        marginRight: 16,
	},
    username: {
        fontSize: 17,
    },
    message: {
        fontSize: 13,
        color: 'grey',
        marginTop: 3
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    acceptButton: {
        backgroundColor: '#3a9fff',
    },
    rejectButton: {
        borderColor: '#94A3B8',
    },
}) 