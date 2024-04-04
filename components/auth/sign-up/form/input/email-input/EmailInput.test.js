import App from '../../../../../../App'
import { render } from '@testing-library/react-native'
import EmailInput from './EmailInput'

jest.useFakeTimers()

describe('App', () => {
	it('has correct placeholder text', () => {
		const { getByPlaceholderText } = render(<App />)
		const input = getByPlaceholderText('Email')
		expect(input).toBeTruthy()
	})

	it('does not have secure text', () => {
		const { getByPlaceholderText } = render(<EmailInput />)
		const input = getByPlaceholderText('Email')
		expect(input.findByProps({secureTextEntry: false})).toBeDefined()
	})
})