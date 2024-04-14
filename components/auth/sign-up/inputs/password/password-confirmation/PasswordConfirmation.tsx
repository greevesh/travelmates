import BaseInput from '../../../../../base/Input'
import Eye from '../eye/Eye'

export default function PasswordConfirmation() {
	return (
		<>
			<BaseInput placeholder="Confirm password" secureText={true} testId="password-confirmation" />
			<Eye top={192} />
		</>
	)
}
