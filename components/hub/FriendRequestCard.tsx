import { StyleSheet, View, Image } from 'react-native'
import { IconButton, Text } from 'react-native-paper'

interface FriendRequestCardProps {
    pic: string,
    username: string
    onAccept: () => void
    onReject: () => void
}

export default function FriendRequestCard({ pic, username, onAccept, onReject }: FriendRequestCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image
                    src={pic} 
                    source={require('../../assets/img/placeholder-profile2.webp')} 
                    style={styles.img} 
                />
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
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
        width: '70%'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        width: '80%'
    },
    img: {
		width: 50,
		height: 50,
		borderRadius: 25,
        marginRight: 20,
        marginLeft: -25
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
        gap: 8,
    },
    acceptButton: {
        backgroundColor: '#3a9fff',
    },
    rejectButton: {
        borderColor: '#94A3B8',
    },
}) 