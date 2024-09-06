import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-paper'

import ChooseFileButton from './ChooseFileButton'
import { useProfilePhotoStore } from '../../../stores/useProfilePhotoStore'
import { useFileUploadModalStore } from '../../../stores/useFileUploadModalStore'

export default function UploadPhotoButton() {
	const { modalVisible, setModalVisible } = useFileUploadModalStore((state) => ({
		modalVisible: state.modalVisible,
		setModalVisible: state.setModalVisible,
	}))
	const uploaded = useProfilePhotoStore((state) => state.uploaded)

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
			<Button onPress={handleClick} style={styles.btn} icon="upload" labelStyle={{ color: '#c6c6c6' }}><Text style={{ color: '#fff' }}>
				{uploaded ? <Text>Edit</Text> : <Text>Upload</Text>}</Text>
			</Button>
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
		width: '65%',
		backgroundColor: '#0047AB'
	},
})