import { User } from "@/stores/useUserStore"
import { StyleSheet, View } from "react-native"
import ListItem from "./ListItem"

interface IOutputProps {
    selectedUsers: User[],
    handleRemoveUser: (user: User) => void
}

export default function Output({ selectedUsers, handleRemoveUser }: IOutputProps) {
    return (
        <View style={styles.container}>
			<ListItem number="1" selectedUser={selectedUsers[0]} handleRemoveUser={() => handleRemoveUser(selectedUsers[0])} />
			<ListItem number="2" selectedUser={selectedUsers[1]} handleRemoveUser={() => handleRemoveUser(selectedUsers[1])} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
		display: 'flex',
		flexDirection: 'column',
		rowGap: 10,
		top: 90,
		left: 20,
		width: '100%',
	},
})