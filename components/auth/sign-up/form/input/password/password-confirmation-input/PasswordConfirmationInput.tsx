import React from 'react'
import BaseInput from '../../../../../../base/input/BaseInput'
import Eye from '../eye/Eye'

export default function PasswordConfirmationInput() {
	return (
		<>
			<BaseInput
				placeholder="Confirm password"
				secureText={true}
				testId="password-confirmation-input"
			/>
			<Eye top={192} />
		</>
	)
}
