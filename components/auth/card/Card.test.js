import { render } from '@testing-library/react-native'
import AuthCard from './Card'

jest.useFakeTimers()

describe('AuthCard', () => {
	it('contains necessary children', () => {
		const { getByTestId } = render(<AuthCard />)
		const img = getByTestId('auth-img')
		const title = getByTestId('sign-up-title')
		const inputRows = getByTestId('sign-up-rows')
		const forgotPassword = getByTestId('already-have-account')
		const signUpButton = getByTestId('sign-up-button')
		const googleSignUpButton = getByTestId('google-sign-up')

		expect(img).toBeDefined()
		expect(title).toBeDefined()
		expect(inputRows).toBeDefined()
		expect(forgotPassword).toBeDefined()
		expect(signUpButton).toBeDefined()
		expect(googleSignUpButton).toBeDefined()
	})
})