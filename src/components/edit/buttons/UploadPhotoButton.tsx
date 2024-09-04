import { useState } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-paper'

import ChooseFileButton from './ChooseFileButton'
import { useProfilePhotoStore } from '../../../stores/useProfilePhotoStore'

export default function UploadPhotoButton() {
	const [visible, setVisible] = useState(false)
	const uploaded = useProfilePhotoStore((state) => state.uploaded)

	const handleClick = () => {
		setVisible(!visible)
	}

	return (
		<>
			<Modal
				animationType="slide"
				transparent={false}
				visible={visible}
				onRequestClose={() => {
					setVisible(!visible)
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