import { render } from '@testing-library/react-native'
import PasswordConfirmation from './PasswordConfirmation'

jest.useFakeTimers()

describe('PasswordConfirmation', () => {
	it('has correct placeholder text', () => {
		const { getByPlaceholderText } = render(<PasswordConfirmation />)
		const input = getByPlaceholderText('Confirm password')
		expect(input).toBeTruthy()
	})

	it('has secure text', () => {
		const { getByPlaceholderText } = render(<PasswordConfirmation />)
		const input = getByPlaceholderText('Confirm password')
		expect(input.findByProps({secureTextEntry: true})).toBeDefined()
	})
})