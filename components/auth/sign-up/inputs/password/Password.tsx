import BaseInput from '../../../../base/Input'
import Eye from './eye/Eye'

export default function Password() {
	return (
		<>
			<BaseInput placeholder="Password" secureText={true} testId="sign-up-password" />
			<Eye top={105} />
		</>
	)
}
