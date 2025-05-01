import React, { ReactNode } from 'react'
import { Modal, View, StyleSheet } from 'react-native'

interface WithModalProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

const WithModal = ({ visible, onClose, children }: WithModalProps) => {
    return (
        <Modal
          visible={visible}
          transparent={true}
          animationType="fade"
          onRequestClose={onClose}
        >
          <View style={styles.container}>
            <View style={styles.content}>
              {children}
            </View>
          </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 350,
  },
})

export default WithModal 