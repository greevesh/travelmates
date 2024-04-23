import { TextInput } from 'react-native-paper'
import useSetValue from '../../../../../../hooks/useSetValue'
import useToggleSecureText from '../../../../../../hooks/useToggleSecureText'
import Eye from '../eye/Eye'

export default function PasswordConfirmation() {
	const {value, setValue} = useSetValue()
	const { secureText, setSecureText, icon } = useToggleSecureText(false)

	return (
		<>
			<TextInput value={value} onChangeText={setValue} placeholder='Confirm password' secureTextEntry={!secureText} style={{backgroundColor: '#fff'}} testID='password-confirmation' />
			<Eye icon={icon} onPress={setSecureText} top={132} />
		</>
	)
}
