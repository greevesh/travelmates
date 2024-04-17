import useToggleSecureText from '../../../../../../hooks/useToggleSecureText'
import BaseInput from '../../../../../base/Input'
import Eye from '../eye/Eye'

export default function PasswordConfirmation() {
	const { secureText, setSecureText, icon } = useToggleSecureText(false)

	return (
		<>
			<BaseInput placeholder="Confirm password" secureText={!secureText} testId="password-confirmation" />
			<Eye icon={icon} onPress={setSecureText} top={192} />
		</>
	)
}
