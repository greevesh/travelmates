import { StyleSheet, View } from 'react-native'
import { Icon, IconButton, Text } from 'react-native-paper'
import { useState } from 'react'
import SearchUserBar from '../edit/SearchUserBar'
import React from 'react'
import WithModal from '../hoc/WithModal'
import PlaneIcon from '../base/PlaneIcon'

export default function SendFriendRequestButton() {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <IconButton
                icon="account-plus"
                size={32}
                iconColor="#183a75"
                onPress={() => setVisible(true)}
                style={styles.icon}
            />
            <WithModal
                style={styles.modal}
                visible={visible}
				onClose={() => setVisible(false)}
            >
                <PlaneIcon style={{ top: 10, left: 10 }} />
                <Text style={styles.title}>Add Friend</Text>
                <SearchUserBar />
            </WithModal>
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginTop: 4,
    },
    modal: {
        width: '90%',
        height: 185,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center',
        color: '#000',
    },
    planeContainer: {
        position: 'absolute', 
        top: 10, 
        left: 10
    },
}) 