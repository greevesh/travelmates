import { render } from '@testing-library/react-native'
import SignUpInputRows from './SignUpInputRows'

jest.useFakeTimers()

describe('App', () => {
	it('contains all 3 sign up inputs', () => {
		const { getByTestId } = render(<SignUpInputRows />)
		const emailInput = getByTestId('email-input')
		const passwordInput = getByTestId('password-input')
		const passwordConfirmationInput = getByTestId('password-confirmation-input')

		expect(emailInput).toBeDefined()
		expect(passwordInput).toBeDefined()
		expect(passwordConfirmationInput).toBeDefined()
	})
})