import { render } from '@testing-library/react-native'
import AuthCard from './Card'

jest.useFakeTimers()

describe('AuthCard', () => {
	it('contains necessary children', () => {
		const { getByTestId } = render(<AuthCard />)
		const img = getByTestId('auth-img')
		const title = getByTestId('sign-up-title')
		const form = getByTestId('sign-up-form')
		const googleSignUpButton = getByTestId('google-sign-up')

		expect(img).toBeDefined()
		expect(title).toBeDefined()
		expect(form).toBeDefined()
		expect(googleSignUpButton).toBeDefined()
	})
})