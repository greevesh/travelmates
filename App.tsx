import { View } from 'react-native'
import BaseInput from './components/base/input/BaseInput'

export default function App() {
	return (
		<View>
			<BaseInput placeholder='Email' secureText={false} />
		</View>
	)
}