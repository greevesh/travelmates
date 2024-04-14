import { render } from '@testing-library/react-native'
import InputRows from './InputRows'

jest.useFakeTimers()

describe('App', () => {
	it('contains all 3 sign up inputs', () => {
		const { getByTestId } = render(<InputRows />)
		const email = getByTestId('sign-up-email')
		const password = getByTestId('sign-up-password')
		const passwordConfirmation = getByTestId('password-confirmation')

		expect(email).toBeDefined()
		expect(password).toBeDefined()
		expect(passwordConfirmation).toBeDefined()
	})
})