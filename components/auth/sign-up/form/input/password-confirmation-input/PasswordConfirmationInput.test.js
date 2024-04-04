import App from '../../../../../../App'
import { render } from '@testing-library/react-native'
import PasswordConfirmationInput from './PasswordConfirmationInput'

jest.useFakeTimers()

describe('App', () => {
	it('has correct placeholder text', () => {
		const { getByPlaceholderText } = render(<App />)
		const input = getByPlaceholderText('Confirm password')
		expect(input).toBeTruthy()
	})

	it('has secure text', () => {
		const { getByPlaceholderText } = render(<PasswordConfirmationInput />)
		const input = getByPlaceholderText('Confirm password')
		expect(input.findByProps({secureTextEntry: true})).toBeDefined()
	})
})