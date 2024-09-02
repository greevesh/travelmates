import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import UploadPhotoButton from './buttons/UploadPhotoButton'
import DeletePhotoButton from './buttons/DeletePhotoButton'

export default function EditPhotoButtons() {
	const [uploaded] = useState(true)

	return (
		<>
			{uploaded ? <View style={styles.btnContainerUploaded}>
				<UploadPhotoButton uploaded={uploaded} />
				<DeletePhotoButton />
			</View>
				: <View style={styles.btnContainer}>
					<UploadPhotoButton uploaded={uploaded} />
				</View>}
			
		</>
        
	)
}

const styles = StyleSheet.create({
	btnContainerUploaded: {
		width: '60%',
		height: 90,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	btnContainer: {
		width: '60%',
		height: 90,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
})