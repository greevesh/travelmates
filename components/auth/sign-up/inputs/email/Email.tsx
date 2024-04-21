import { TextInput } from 'react-native-paper'
import useSetValue from '../../../../../hooks/useSetValue'

export default function Email() {
	const {value, setValue} = useSetValue()

	return <TextInput value={value} onChangeText={setValue} placeholder='Email' secureTextEntry={false} style={{backgroundColor: '#fff'}} testID='sign-up-email' />
}
