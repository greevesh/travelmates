import { render } from '@testing-library/react-native'
import AuthCard from './AuthCard'

jest.useFakeTimers()

describe('AuthCard', () => {
	it('contains title, inputs, forgot password, and button', () => {
		const { getByTestId } = render(<AuthCard />)
		const signUpTitle = getByTestId('sign-up-title')
		const signUpInputRows = getByTestId('sign-up-rows')
		const forgotPassword = getByTestId('forgot-password')
		const signUpButton = getByTestId('sign-up-button')

		expect(signUpTitle).toBeDefined()
		expect(signUpInputRows).toBeDefined()
		expect(forgotPassword).toBeDefined()
		expect(signUpButton).toBeDefined()
	})
})