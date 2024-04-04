import React from 'react'
import BaseInput from '../../../../../base/input/BaseInput'

export default function PasswordConfirmationInput() {
	return (
		<BaseInput placeholder='Confirm password' secureText={true} testId='password-confirmation-input'/>
	)
}