import { render } from '@testing-library/react-native'
import SignUpForm from './Form'

jest.useFakeTimers()

describe('AuthCard', () => {
	it('contains necessary children', () => {
		const { getByTestId } = render(<SignUpForm />)
		const inputRows = getByTestId('sign-up-rows')
		const forgotPassword = getByTestId('already-have-account')
		const signUpButton = getByTestId('sign-up-button')
		const googleSignUpButton = getByTestId('google-sign-up')

		expect(inputRows).toBeDefined()
		expect(forgotPassword).toBeDefined()
		expect(signUpButton).toBeDefined()
		expect(googleSignUpButton).toBeDefined()
	})
})