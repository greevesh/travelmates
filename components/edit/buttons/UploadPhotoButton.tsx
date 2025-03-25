import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-paper'

import ChooseFileButton from './ChooseFileButton'
import { useCurrentUserStore } from '../../../stores/useProfilePhotoStore'
import { useFileUploadModalStore } from '../../../stores/useFileUploadModalStore'
import React from 'react'

export default function UploadPhotoButton() {
	const { modalVisible, setModalVisible } = useFileUploadModalStore((state) => ({
		modalVisible: state.modalVisible,
		setModalVisible: state.setModalVisible,
	}))
	const uploaded = useCurrentUserStore((state) => state.uploaded)

	const handleClick = () => {
		setModalVisible(!modalVisible)
	}

	return (
		<>
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible)
				}}
			>
				<View style={styles.container}>
					<Icon source="upload" size={75} color='#c6c6c6' />
					<ChooseFileButton />
				</View>
			</Modal>
			{
				uploaded ? 
				<Button onPress={handleClick} style={[styles.btn, { backgroundColor: '#0056B3' }]} icon="upload" labelStyle={{ color: '#fff' }}>
					<Text style={{ color: 'fff' }}>Edit</Text>
				</Button>
				: 
				<Button onPress={handleClick} style={styles.btn} icon="upload" labelStyle={{ color: '#0056B3' }}>
					<Text style={{ color: '#0056B3' }}>Upload</Text>
				</Button>
			}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	btn: {
		borderRadius: 7,
		borderColor: '#0056B3',
		borderWidth: 1.5,
		width: '65%',
	},
})