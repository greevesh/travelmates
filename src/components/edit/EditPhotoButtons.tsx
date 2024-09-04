import { StyleSheet, View } from 'react-native'

import UploadPhotoButton from './buttons/UploadPhotoButton'
import DeletePhotoButton from './buttons/DeletePhotoButton'
import { useProfilePhotoStore } from '../../stores/useProfilePhotoStore'

export default function EditPhotoButtons() {
	const uploaded = useProfilePhotoStore((state) => state.uploaded)

	return (
		<>
			{uploaded ? <View style={styles.containerUploaded}>
				<UploadPhotoButton />
				<DeletePhotoButton />
			</View>
				: <View style={styles.container}>
					<UploadPhotoButton />
				</View>}
		</>
        
	)
}

const styles = StyleSheet.create({
	containerUploaded: {
		width: '60%',
		height: 90,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	container: {
		width: '60%',
		height: 90,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
})