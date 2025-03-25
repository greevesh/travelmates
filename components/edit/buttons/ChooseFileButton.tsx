import * as ImagePicker from 'expo-image-picker'

import BaseButton from '../../base/Button'
import { useCurrentUserStore } from '../../../stores/useProfilePhotoStore'
import { useFileUploadModalStore } from '../../../stores/useFileUploadModalStore'

export default function ChooseFileButton() {
	const setPhoto = useCurrentUserStore((state) => state.setPhoto)
	const setUploaded = useCurrentUserStore((state) => state.setUploaded)
	const setVisible = useFileUploadModalStore((state) => state.setModalVisible)

	const handleChoosePhoto = async () => {
		const result = await ImagePicker.launchImageLibraryAsync()

		if (!result.canceled) {
			setPhoto(result.assets[0].uri)
			setUploaded(true)
		}

		setVisible(false)
	}

	return (
		<BaseButton onPress={handleChoosePhoto} text="Choose file" bgColor="#0047AB" w={150} />
	)
}