import { render } from '@testing-library/react-native'
import AuthCard from './AuthCard'

jest.useFakeTimers()

describe('AuthCard', () => {
	it('contains necessary children', () => {
		const { getByTestId } = render(<AuthCard />)
		const authImg = getByTestId('auth-img')
		const signUpTitle = getByTestId('sign-up-title')
		const signUpInputRows = getByTestId('sign-up-rows')
		const forgotPassword = getByTestId('already-have-account')
		const signUpButton = getByTestId('sign-up-button')
		const googleSignUpButton = getByTestId('google-sign-up')

		expect(authImg).toBeDefined()
		expect(signUpTitle).toBeDefined()
		expect(signUpInputRows).toBeDefined()
		expect(forgotPassword).toBeDefined()
		expect(signUpButton).toBeDefined()
		expect(googleSignUpButton).toBeDefined()
	})
})