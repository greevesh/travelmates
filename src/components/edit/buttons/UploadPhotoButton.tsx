import { useState } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-paper'

import BaseButton from '../../base/Button'

interface IUploadPhotoButtonProps {
    uploaded: boolean
}

export default function UploadPhotoButton({ uploaded }: IUploadPhotoButtonProps) {
	const [visible, setVisible] = useState(false)

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
					<BaseButton onPress={() => console.log('file opened')} text="Choose file" bgColor="#0047AB" w={150} />
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