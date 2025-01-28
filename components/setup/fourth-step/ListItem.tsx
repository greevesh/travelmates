import { User } from "@/stores/useUserStore"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { Icon } from "react-native-paper"

interface IListItemProps {
    number: string,
    selectedUser: User,
    handleRemoveUser: (user: User) => void
}

export default function ListItem({ number, selectedUser, handleRemoveUser }: IListItemProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{number}. {selectedUser && selectedUser.username}</Text>
            {
                selectedUser &&
                <Pressable style={styles.btn} onPress={() => handleRemoveUser(selectedUser)}>
                    <Icon color="#616161" source="delete" size={18} />
                </Pressable>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
		display: 'flex',
		flexDirection: 'row',
		columnGap: 5,
		alignItems: 'center'
	},
	text: {
		fontSize: 16
	},
	btn: {
		display: 'flex',
		alignItems: 'flex-start',
	}
})