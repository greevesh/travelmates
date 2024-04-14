import BaseInput from '../../../../base/Input'

export default function Email() {
	return <BaseInput placeholder="Email" secureText={false} testId="sign-up-email" />
}
