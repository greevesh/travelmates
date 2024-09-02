import { View, Image } from 'react-native'

interface IProfilePhotoProps {
    size: number
}

export default function ProfilePhoto({ size }: IProfilePhotoProps) {
	return (
		<View>
			<Image style={{ height: size, width: size }} source={require('../../assets/img/placeholder-profile.jpg')} />
		</View>
	)
}