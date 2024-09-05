import { View, Image } from 'react-native'

import { useProfilePhotoStore } from '../../stores/useProfilePhotoStore'

interface IProfilePhotoProps {
    size: number
}

export default function ProfilePhoto({ size }: IProfilePhotoProps) {
	const photo = useProfilePhotoStore((state) => state.photo)

	return (
		<View>
			<Image style={{ height: size, width: size }} source={{ uri: photo }} />
		</View>
	)
}