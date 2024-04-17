import useToggleSecureText from '../../../../../hooks/useToggleSecureText'
import BaseInput from '../../../../base/Input'
import Eye from './eye/Eye'

export default function Password() {
	const { secureText, setSecureText, icon } = useToggleSecureText(false)
	
	return (
		<>
			<BaseInput placeholder="Password" secureText={!secureText} testId="sign-up-password" />
			<Eye icon={icon} onPress={setSecureText} top={105} />
		</>
	)
}
