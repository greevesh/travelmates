import BaseInput from '../../../../../base/input/BaseInput'

export default function EmailInput() {
	return <BaseInput placeholder='Email' secureText={false} testId='email-input' />
}
