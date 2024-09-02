import { StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'

interface IUploadPhotoButtonProps {
    uploaded: boolean
}

export default function UploadPhotoButton({ uploaded }: IUploadPhotoButtonProps) {
	const handleClick = () => {
		console.log('modal opened')
	}

	return (
		<Button onPress={handleClick} style={styles.btn} icon="upload" labelStyle={{ color: '#c6c6c6' }}><Text style={{ color: '#fff' }}>
			{uploaded ? <Text>Edit</Text> : <Text>Upload</Text>}</Text>
		</Button>
	)
}

const styles = StyleSheet.create({
	btn: {
		borderRadius: 7,
		width: '65%',
		backgroundColor: '#0047AB'
	},
})