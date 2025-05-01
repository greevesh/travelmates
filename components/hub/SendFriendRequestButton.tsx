import { StyleSheet } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { useState } from 'react'
import SearchUserBar from '../edit/SearchUserBar'
import React from 'react'
import WithModal from '../hoc/WithModal'

export default function SendFriendRequestButton() {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <IconButton
                icon="account-plus"
                size={32}
                onPress={() => setVisible(true)}
                style={styles.icon}
            />
            <WithModal
                visible={visible}
				onClose={() => setVisible(false)}
            >
                <Text style={styles.title}>Send Friend Request</Text>
                <SearchUserBar />
            </WithModal>
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginTop: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
}) 