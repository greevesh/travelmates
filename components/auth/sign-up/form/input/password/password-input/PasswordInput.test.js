import App from '../../../../../../../App'
import { render } from '@testing-library/react-native'
import PasswordInput from './PasswordInput'

jest.useFakeTimers()

describe('App', () => {
	it('has correct placeholder text', () => {
		const { getByPlaceholderText } = render(<App />)
		const input = getByPlaceholderText('Password')
		expect(input).toBeTruthy()
	})

	it('has secure text', () => {
		const { getByPlaceholderText } = render(<PasswordInput />)
		const input = getByPlaceholderText('Password')
		expect(input.findByProps({secureTextEntry: true})).toBeDefined()
	})
})