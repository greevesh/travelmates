import { View, Image } from 'react-native'

import { useCurrentUserStore } from '../../stores/useProfilePhotoStore'
import React from 'react'

interface IProfilePhotoProps {
    size: number
}

export default function ProfilePhoto({ size }: IProfilePhotoProps) {
	const photo = useCurrentUserStore((state) => state.photo)
	const uploaded = useCurrentUserStore((state) => state.uploaded)

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