import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import UploadPhotoButton from './buttons/UploadPhotoButton'
import DeletePhotoButton from './buttons/DeletePhotoButton'

export default function EditPhotoButtons() {
	const [uploaded] = useState(false)

	return (
		<>
			{uploaded ? <View style={styles.containerUploaded}>
				<UploadPhotoButton uploaded={uploaded} />
				<DeletePhotoButton />
			</View>
				: <View style={styles.container}>
					<UploadPhotoButton uploaded={uploaded} />
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