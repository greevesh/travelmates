import * as ImagePicker from 'expo-image-picker'

import BaseButton from '../../base/Button'
import { useProfilePhotoStore } from '../../../stores/useProfilePhotoStore'

export default function ChooseFileButton() {
	const setPhoto = useProfilePhotoStore((state) => state.setPhoto)
	const setUploaded = useProfilePhotoStore((state) => state.setUploaded)

	const handleChoosePhoto = async () => {
		const result = await ImagePicker.launchImageLibraryAsync()

		if (!result.canceled) {
			setPhoto(result.assets[0].uri)
		}

		setUploaded(true)
	}

	return (
		<BaseButton onPress={handleChoosePhoto} text="Choose file" bgColor="#0047AB" w={150} />
	)
}