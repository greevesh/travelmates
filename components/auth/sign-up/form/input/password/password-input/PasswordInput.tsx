import BaseInput from '../../../../../../base/input/BaseInput'
import Eye from '../eye/Eye'

export default function PasswordInput() {
	return (
		<>
			<BaseInput placeholder="Password" secureText={true} testId="password-input" />
			<Eye top={105} />
		</>
	)
}
