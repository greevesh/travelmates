import { ActivityIndicator } from 'react-native-paper'

export default function Spinner() {
	return (
		<ActivityIndicator animating={true} color={'#fff'} style={{ position: 'absolute', left: 200 }} />
	)
}
