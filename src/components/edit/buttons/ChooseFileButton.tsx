import BaseButton from '../../base/Button'
import { useProfilePhotoStore } from '../../../stores/useProfilePhotoStore'

export default function ChooseFileButton() {
	const setPhoto = useProfilePhotoStore((state) => state.setPhoto)
	const setUploaded = useProfilePhotoStore((state) => state.setUploaded)

	const setUploadedState = () => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		setPhoto(require('../../../assets/img/travel-mates.jpg'))
		setUploaded(true)
	}

	return (
		<BaseButton onPress={() => setUploadedState()} text="Choose file" bgColor="#0047AB" w={150} />
	)
}