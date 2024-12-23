import { User } from "@/stores/useUserStore"
import { StyleSheet, View, Text } from "react-native"
import { IconButton } from "react-native-paper"

interface IOutputProps {
    selectedUsers: User[],
    handleRemoveUser: (user: User) => void
}

export default function Output({ selectedUsers, handleRemoveUser }: IOutputProps) {
    return (
        <View style={styles.container}>
            {selectedUsers.map((user) => (
                <View key={user._id} style={styles.output}>
                    <Text>{user.username}</Text>
                    <IconButton style={styles.icon} size={18} icon="close" onPress={() => handleRemoveUser(user)} accessibilityLabel={`Remove ${user.username}`} />
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: 60,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	output: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10,
		paddingHorizontal: 10,
		backgroundColor: '#f5f5f5',
		borderWidth: 0.5,
		height: 30,
		borderRadius: 50,
	},
    icon: {
		height: 20,
		width: 20,
		marginRight: 0
	}
})