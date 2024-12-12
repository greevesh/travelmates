import { View, Image } from 'react-native'

import { useProfilePhotoStore } from '../../stores/useProfilePhotoStore'

interface IProfilePhotoProps {
    size: number
}

export default function ProfilePhoto({ size }: IProfilePhotoProps) {
	const photo = useProfilePhotoStore((state) => state.photo)
	const uploaded = useProfilePhotoStore((state) => state.uploaded)

	return (
		<>
			<View>
				{uploaded ? <Image style={{ height: size, width: size, borderRadius: size / 2 }} source={{ uri: photo }} />
					:
					<Image style={{ height: size, width: size, borderRadius: size / 2 }} source={require('../../assets/img/placeholder-profile.png')} />}
			</View>
		</>
	)
}